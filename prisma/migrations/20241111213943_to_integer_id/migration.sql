/*
  Warnings:

  - The primary key for the `Author` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Author` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Startup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Startup` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `authorid` on the `Startup` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Startup" DROP CONSTRAINT "Startup_authorid_fkey";

-- DropIndex
DROP INDEX "Author_id_key";

-- DropIndex
DROP INDEX "Startup_id_key";

-- AlterTable
ALTER TABLE "Author" DROP CONSTRAINT "Author_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Author_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Startup" DROP CONSTRAINT "Startup_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "authorid",
ADD COLUMN     "authorid" INTEGER NOT NULL,
ADD CONSTRAINT "Startup_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Startup" ADD CONSTRAINT "Startup_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
