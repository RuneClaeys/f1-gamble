import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const seasonGrandPrixSeeder = async (prisma: PrismaClient) => {
  const year = 2022;
  const season = await prisma.season.findFirst({ where: { year } });

  const yearGrandPrix = await fetch(`http://ergast.com/api/f1/${year}.json`)
    .then((response) => response.json())
    .then((data: any) =>
      data.MRData.RaceTable.Races?.map((race) => {
        return {
          round: +race.round,
          name: race.raceName,
          circuit: race.Circuit.circuitName,
          raceTimestamp: new Date(`${race.date} ${race.time}`),
        };
      }),
    );

  const grandPrix = await Promise.all(
    yearGrandPrix.map(async (ygp) => {
      return await prisma.grandPrix.findFirst({ where: { round: ygp.round } });
    }),
  );

  return Promise.all(
    grandPrix.map(async (gp) => {
      return prisma.seasonGrandPrix.upsert({
        where: { grandPrixId_seasonId: { grandPrixId: gp.id, seasonId: season.id } },
        create: {
          season: { connect: { id: season.id } },
          grandPrix: { connect: { id: gp.id } },
        },
        update: {},
      });
    }),
  );
};

export { seasonGrandPrixSeeder };
