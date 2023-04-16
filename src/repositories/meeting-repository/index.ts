import { prisma } from "../../config";
import { CreateMeetingParams } from "../../services";

async function createMeeting(params: CreateMeetingParams) {
 return prisma.meeting.create({
  data: params
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
