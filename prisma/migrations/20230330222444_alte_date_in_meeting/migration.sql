/*
  Warnings:

  - Changed the type of `date` on the `Meeting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(6) NOT NULL;
