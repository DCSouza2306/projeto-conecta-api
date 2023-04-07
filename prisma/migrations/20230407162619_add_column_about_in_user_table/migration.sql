/*
  Warnings:

  - You are about to drop the column `readingListId` on the `BookList` table. All the data in the column will be lost.
  - You are about to drop the `ReadingList` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `BookList` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BookList" DROP CONSTRAINT "BookList_fk0";

-- DropForeignKey
ALTER TABLE "ReadingList" DROP CONSTRAINT "ReadingList_fk0";

-- AlterTable
ALTER TABLE "BookList" DROP COLUMN "readingListId",
ADD COLUMN     "groupId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" VARCHAR;

-- DropTable
DROP TABLE "ReadingList";

-- AddForeignKey
ALTER TABLE "BookList" ADD CONSTRAINT "BookList_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
