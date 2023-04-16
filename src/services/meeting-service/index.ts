import { Meeting } from "@prisma/client";
import meetingRepository from "../../repositories/meeting-repository";
import groupRepository from "../../repositories/group-repository";
import { notFoundError } from "../../errors/not-found-error";
import meetingParticipantRepository from "../../repositories/meeting-participant-repository";

async function createMeeting(params: CreateMeetingParams, groupId: number) {
    const group = await groupRepository.getGroupById(groupId)

    if(!group){
        throw notFoundError();
    }

    const meeting = await meetingRepository.createMeeting(params, groupId);
    return meeting;
}

async function confirmMetting(groupId: number, userId: number){

    const meeting = await meetingRepository.findMeetingByGroupId(groupId);

    if(!meeting){
        throw notFoundError()
    };

    const meetingParticipant = await meetingParticipantRepository.findByParticipantId(userId)

    if(meetingParticipant){
        await meetingParticipantRepository.deleteMeetingParticipant(meetingParticipant.id);
        return {}
    }

    const response = await meetingParticipantRepository.confirmMetting(meeting.id, userId)
    return response;
}

const meetingService = {
 createMeeting,
 confirmMetting
};

export default meetingService;

export type CreateMeetingParams = Omit<
 Meeting,
 "id" | "createdAt" | "updatedAt" | "status" | "groupId"
>;
