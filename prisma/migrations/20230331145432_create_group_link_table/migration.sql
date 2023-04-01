/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_fk0";

-- DropTable
DROP TABLE "Link";

-- CreateTable
CREATE TABLE "BookLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupLink" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookLink" ADD CONSTRAINT "Link_fk0" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "GroupLink" ADD CONSTRAINT "GroupLink_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
