import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const seasonDriverSeeder = async (prisma: PrismaClient, year = 2022) => {
  const season = await prisma.season.findFirst({ where: { year } });
  const teams = await prisma.team.findMany();

  const driverTeams = await Promise.all(
    teams.map(async (team) => {
      const drivers = await fetch(`http://ergast.com/api/f1/${year}/constructors/${team.key}/drivers.json`)
        .then((response) => response.json())
        .then((data: any) => data.MRData.DriverTable.Drivers)
        .then(async (drivers) => {
          return await Promise.all(
            drivers.map(async (driver) => {
              return await prisma.driver.findFirst({ where: { key: driver.driverId } });
            }),
          );
        });

      return { team, drivers };
    }),
  );

  return Promise.all(
    driverTeams.map(async (driverTeam) => {
      return await Promise.all(
        driverTeam.drivers.map(async (driver) => {
          return await prisma.seasonDriver.upsert({
            where: { teamId_seasonId_driverId: { teamId: driverTeam.team.id, seasonId: season.id, driverId: driver.id } },
            create: {
              season: { connect: { id: season.id } },
              driver: { connect: { id: driver.id } },
              team: { connect: { id: driverTeam.team.id } },
            },
            update: {},
          });
        }),
      );
    }),
  );
};

export { seasonDriverSeeder };
