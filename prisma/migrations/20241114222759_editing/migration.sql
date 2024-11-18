/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usename` on the `Author` table. All the data in the column will be lost.
  - Added the required column `username` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Startup" DROP CONSTRAINT "Startup_authorid_fkey";

-- AlterTable
ALTER TABLE "Author" DROP CONSTRAINT "Author_pkey",
DROP COLUMN "usename",
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Author_id_seq";

-- AlterTable
ALTER TABLE "Startup" ALTER COLUMN "authorid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
