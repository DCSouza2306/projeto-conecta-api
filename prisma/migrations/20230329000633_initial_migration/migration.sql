-- CreateEnum
CREATE TYPE "GroupStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('APPLIED', 'APROVED', 'DENIED');

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Author_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "synopsis" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Book_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookList" (
    "id" SERIAL NOT NULL,
    "readingListId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookList_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookVote" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "BookVote_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "status" "GroupStatus" NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "urlImage" TEXT NOT NULL,

    CONSTRAINT "Group_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListVote" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "ListVote_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIME(6) NOT NULL,
    "hour" TIME(6) NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Meeting_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReadingList" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ReadingList_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "status" "RegistrationStatus" NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Registration_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "user" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "User_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_key" ON "User"("user");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_fk0" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookList" ADD CONSTRAINT "BookList_fk1" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookList" ADD CONSTRAINT "BookList_fk0" FOREIGN KEY ("readingListId") REFERENCES "ReadingList"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookVote" ADD CONSTRAINT "BookVote_fk1" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BookVote" ADD CONSTRAINT "BookVote_fk0" FOREIGN KEY ("listId") REFERENCES "ListVote"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_fk0" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ListVote" ADD CONSTRAINT "ListVote_fk0" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_fk0" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ReadingList" ADD CONSTRAINT "ReadingList_fk0" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_fk1" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
