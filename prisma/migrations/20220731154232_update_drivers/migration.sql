/*
  Warnings:

  - You are about to drop the column `firstName` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `driver` table. All the data in the column will be lost.
  - You are about to drop the column `raceNumber` on the `driver` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `driver` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyName` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `givenName` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permanentNumber` to the `driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "driver" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "raceNumber",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TEXT NOT NULL,
ADD COLUMN     "familyName" TEXT NOT NULL,
ADD COLUMN     "givenName" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "permanentNumber" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "driver_code_key" ON "driver"("code");
