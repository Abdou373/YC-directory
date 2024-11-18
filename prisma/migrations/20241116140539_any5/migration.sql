/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `bio` on table `Author` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `id` on the `Author` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `authorid` on the `Startup` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Startup" DROP CONSTRAINT "Startup_authorid_fkey";

-- AlterTable
ALTER TABLE "Author" DROP CONSTRAINT "Author_pkey",
ALTER COLUMN "bio" SET NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Startup" DROP COLUMN "authorid",
ADD COLUMN     "authorid" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
