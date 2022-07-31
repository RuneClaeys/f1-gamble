/*
  Warnings:

  - You are about to drop the column `race_number` on the `driver` table. All the data in the column will be lost.
  - Added the required column `raceNumber` to the `driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "driver" DROP COLUMN "race_number",
ADD COLUMN     "raceNumber" INTEGER NOT NULL;
