/*
  Warnings:

  - Added the required column `status` to the `BookList` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookListType" AS ENUM ('CURRENT', 'READ', 'NEXT');

-- AlterTable
ALTER TABLE "BookList" ADD COLUMN     "status" "BookListType" NOT NULL;
