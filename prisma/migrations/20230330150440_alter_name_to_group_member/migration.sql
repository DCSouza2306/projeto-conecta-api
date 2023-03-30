/*
  Warnings:

  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PositionType" AS ENUM ('OWNER', 'MEMBER', 'OFFICER');

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_fk1";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_fk0";

-- DropTable
DROP TABLE "Registration";

-- CreateTable
CREATE TABLE "GroupMember" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "status" "RegistrationStatus" NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "position" "PositionType" NOT NULL,

    CONSTRAINT "Registration_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "Registration_fk1" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "Registration_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
