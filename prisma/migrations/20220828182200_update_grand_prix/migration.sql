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

-- CreateIndex
CREATE UNIQUE INDEX "grand-prix_name_key" ON "grand-prix"("name");

-- AddForeignKey
ALTER TABLE "SeasonGrandPrix" ADD CONSTRAINT "SeasonGrandPrix_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeasonGrandPrix" ADD CONSTRAINT "SeasonGrandPrix_grandPrixId_fkey" FOREIGN KEY ("grandPrixId") REFERENCES "grand-prix"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
