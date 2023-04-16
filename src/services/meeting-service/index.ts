import { Meeting } from "@prisma/client";
import meetingRepository from "../../repositories/meeting-repository";
import groupRepository from "../../repositories/group-repository";
import { notFoundError } from "../../errors/not-found-error";

async function createMeeting(params: CreateMeetingParams, groupId: number) {
    const group = await groupRepository.getGroupById(groupId)

    if(!group){
        throw notFoundError();
    }

    const meeting = await meetingRepository.createMeeting(params, groupId);
    return meeting;
}

const meetingService = {
 createMeeting,
};

export default meetingService;

export type CreateMeetingParams = Omit<
 Meeting,
 "id" | "createdAt" | "updatedAt" | "status" | "groupId"
>;
