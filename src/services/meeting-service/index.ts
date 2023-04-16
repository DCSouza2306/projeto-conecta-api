import { Meeting } from "@prisma/client";
import meetingRepository from "../../repositories/meeting-repository";
import groupRepository from "../../repositories/group-repository";
import { notFoundError } from "../../errors/not-found-error";
import meetingParticipantRepository from "../../repositories/meeting-participant-repository";
import { invalidMemberGroupError } from "./errors";

async function createMeeting(params: CreateMeetingBodyParams, groupId: number) {
 const { mediator: userId } = params;

 await validadeGroupAndMediator(groupId, userId);

 const meeting = await meetingRepository.createMeeting({...params, groupId: groupId, status: "COMING"});
 return meeting;
}

async function confirmMetting(groupId: number, userId: number) {
 const meeting = await meetingRepository.findMeetingByGroupId(groupId);

 if (!meeting) {
  throw notFoundError();
 }

 const meetingParticipant =
  await meetingParticipantRepository.findByParticipantId(userId);

 if (meetingParticipant) {
  await meetingParticipantRepository.deleteMeetingParticipant(
   meetingParticipant.id
  );
  return {};
 }

 const response = await meetingParticipantRepository.confirmMetting(
  meeting.id,
  userId
 );
 return response;
}

async function validadeGroupAndMediator(groupId: number, userId: number) {
 const group = await groupRepository.getGroupById(groupId);

 if (!group) {
  throw notFoundError();
 }

 const isMember = group.GroupMember.some(
  (e) =>
   e.userId == userId &&
   (e.Role.name === "administrator" || e.Role.name === "owner")
 );

 if (!isMember) {
  throw invalidMemberGroupError();
 }
}

const meetingService = {
 createMeeting,
 confirmMetting,
};

export default meetingService;

export type CreateMeetingBodyParams = Omit<
 Meeting,
 "id" | "createdAt" | "updatedAt" | "status" | "groupId"
>;

export type CreateMeetingParams = Omit<Meeting, "id" | "createdAt" | "updatedAt" >
