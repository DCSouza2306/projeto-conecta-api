/*
  Warnings:

  - You are about to drop the column `user` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_user_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "user",
ADD COLUMN     "userName" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_user_key" ON "User"("userName");
