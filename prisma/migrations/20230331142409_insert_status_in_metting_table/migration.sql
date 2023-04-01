/*
  Warnings:

  - Added the required column `status` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MeetingStatusType" AS ENUM ('DONE', 'COMING');

-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "status" "MeetingStatusType" NOT NULL;
