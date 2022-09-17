-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key" TEXT NOT NULL,
    "permanentNumber" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "url" TEXT,
    "givenName" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "dateOfBirth" TEXT,
    "nationality" TEXT,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "key" TEXT NOT NULL,
    "url" TEXT,
    "name" TEXT NOT NULL,
    "nationality" TEXT,
    "shortName" TEXT,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "year" INTEGER NOT NULL,
    "seasonStartDate" TIMESTAMP(3) NOT NULL,
    "seasonEndDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grand-prix" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "circuit" TEXT NOT NULL,
    "round" INTEGER NOT NULL,
    "raceTimestamp" TIMESTAMP(3),
    "qualifyingTimestamp" TIMESTAMP(3),

    CONSTRAINT "grand-prix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeasonGrandPrix" (
    "seasonId" UUID NOT NULL,
    "grandPrixId" UUID NOT NULL,

    CONSTRAINT "SeasonGrandPrix_pkey" PRIMARY KEY ("grandPrixId","seasonId")
);

-- CreateTable
CREATE TABLE "SeasonDriver" (
    "teamId" UUID NOT NULL,
    "seasonId" UUID NOT NULL,
    "driverId" UUID NOT NULL,

    CONSTRAINT "SeasonDriver_pkey" PRIMARY KEY ("teamId","seasonId","driverId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_key_key" ON "drivers"("key");

-- CreateIndex
CREATE UNIQUE INDEX "drivers_code_key" ON "drivers"("code");

-- CreateIndex
CREATE UNIQUE INDEX "teams_key_key" ON "teams"("key");

-- CreateIndex
CREATE UNIQUE INDEX "teams_name_key" ON "teams"("name");

-- CreateIndex
CREATE UNIQUE INDEX "seasons_year_key" ON "seasons"("year");

-- CreateIndex
CREATE UNIQUE INDEX "grand-prix_name_key" ON "grand-prix"("name");

-- AddForeignKey
ALTER TABLE "SeasonGrandPrix" ADD CONSTRAINT "SeasonGrandPrix_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonGrandPrix" ADD CONSTRAINT "SeasonGrandPrix_grandPrixId_fkey" FOREIGN KEY ("grandPrixId") REFERENCES "grand-prix"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonDriver" ADD CONSTRAINT "SeasonDriver_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonDriver" ADD CONSTRAINT "SeasonDriver_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonDriver" ADD CONSTRAINT "SeasonDriver_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
