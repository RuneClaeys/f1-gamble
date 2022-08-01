import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const teamSeeder = async (prisma: PrismaClient) => {
  const teams = await fetch('http://ergast.com/api/f1/2022/constructors.json')
    .then((response) => response.json())
    .then((data: any) =>
      data.MRData.ConstructorTable.Constructors?.map((team) => {
        const newTeam = { ...team, key: team.constructorId };
        delete newTeam.constructorId;
        return newTeam;
      }),
    );

  await Promise.all(teams.map((team) => prisma.team.upsert({ where: { name: team.name }, create: team, update: team })));
};

export { teamSeeder };
