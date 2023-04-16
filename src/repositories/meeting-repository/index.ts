import { prisma } from "../../config";
import { CreateMeetingParams } from "../../services";
import { Meeting } from "@prisma/client";

async function createMeeting(params: CreateMeetingParams, groupId: number){
    
    return prisma.meeting.create({
        data: {
            date: params.date,
            description: params.description,
            hour: params.hour,
            status: "COMING",
            url: params.url,
            groupId
        }
    })
}

const meetingRepository = {
    createMeeting
}

export default meetingRepository