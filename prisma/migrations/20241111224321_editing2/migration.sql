/*
  Warnings:

  - You are about to drop the column `pitch` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Startup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Startup" DROP COLUMN "pitch",
DROP COLUMN "slug";
