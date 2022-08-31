import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const grandPrixSeeder = async (prisma: PrismaClient) => {
  const grandPrix = await fetch('http://ergast.com/api/f1/2022.json')
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

  await Promise.all(grandPrix.map((gp) => prisma.grandPrix.upsert({ where: { name: gp.name }, create: gp, update: gp })));
};

export { grandPrixSeeder };
