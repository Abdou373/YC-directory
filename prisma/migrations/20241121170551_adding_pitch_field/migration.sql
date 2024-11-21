/*
  Warnings:

  - The primary key for the `Startup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `pitch` to the `Startup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Startup" DROP CONSTRAINT "Startup_pkey",
ADD COLUMN     "pitch" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Startup_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Startup_id_seq";
