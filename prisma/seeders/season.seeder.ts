import { PrismaClient } from '@prisma/client';

const seasonSeeder = async (prisma: PrismaClient, year = 2022) => {
  const season = { year, seasonEndDate: new Date('2022-03-20'), seasonStartDate: new Date('2022-10-20') };
  await prisma.season.upsert({ where: { year: season.year }, create: season, update: season });
};

export { seasonSeeder };
