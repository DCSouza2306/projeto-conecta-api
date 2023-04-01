/*
  Warnings:

  - Added the required column `finishAt` to the `BookList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAt` to the `BookList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookList" ADD COLUMN     "finishAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startAt" TIMESTAMP(3) NOT NULL;
