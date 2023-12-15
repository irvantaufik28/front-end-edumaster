/*
  Warnings:

  - You are about to drop the column `is_active` on the `classroom` table. All the data in the column will be lost.
  - Added the required column `status` to the `classroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classroom" DROP COLUMN "is_active",
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "year_group" SET DEFAULT 'active';
