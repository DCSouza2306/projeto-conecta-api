-- AlterTable
ALTER TABLE "GroupLink" ALTER COLUMN "createdAt" DROP NOT NULL;

-- CreateTable
CREATE TABLE "MeetingParticipant" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "MeetingParticipant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MeetingParticipant" ADD CONSTRAINT "MeetingParticipant_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MeetingParticipant" ADD CONSTRAINT "MeetingParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
