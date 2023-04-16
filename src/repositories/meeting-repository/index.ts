import { prisma } from "../../config";
import { CreateMeetingParams } from "../../services";

async function createMeeting(params: CreateMeetingParams, groupId: number) {
 return prisma.meeting.create({
  data: {
   date: params.date,
   description: params.description,
   hour: params.hour,
   status: "COMING",
   url: params.url,
   groupId,
  },
 });
}

async function findMeetingByGroupId(groupId: number) {
 return prisma.meeting.findFirst({
  where: { groupId, status: "COMING" },
 });
}


const meetingRepository = {
 createMeeting,
 findMeetingByGroupId,
};

export default meetingRepository;
