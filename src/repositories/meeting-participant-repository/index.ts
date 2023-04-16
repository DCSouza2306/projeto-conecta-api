import { prisma } from "../../config";

async function findByParticipantId(userId: number) {
 return prisma.meetingParticipant.findFirst({
  where: { userId },
 });
}

async function confirmMetting(meetingId: number, userId: number) {
 return prisma.meetingParticipant.create({
  data: {
   meetingId,
   userId,
  },
 });
}

async function deleteMeetingParticipant(id: number) {
 return prisma.meetingParticipant.delete({
  where: { id },
 });
}

const meetingParticipantRepository = {
 confirmMetting,
 findByParticipantId,
 deleteMeetingParticipant
};

export default meetingParticipantRepository;
