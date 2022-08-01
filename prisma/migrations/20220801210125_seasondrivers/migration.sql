/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `teams` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SeasonDriver" (
    "teamId" UUID NOT NULL,
    "seasonId" UUID NOT NULL,
    "driverId" UUID NOT NULL,

    CONSTRAINT "SeasonDriver_pkey" PRIMARY KEY ("teamId","seasonId","driverId")
);

-- CreateIndex
CREATE UNIQUE INDEX "drivers_key_key" ON "drivers"("key");

-- CreateIndex
CREATE UNIQUE INDEX "teams_key_key" ON "teams"("key");

-- AddForeignKey
ALTER TABLE "SeasonDriver" ADD CONSTRAINT "SeasonDriver_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonDriver" ADD CONSTRAINT "SeasonDriver_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonDriver" ADD CONSTRAINT "SeasonDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
