import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const driverSeeder = async () => {
  const season = { year: 2022, seasonEndDate: new Date('2022-03-20'), seasonStartDate: new Date('2022-10-20') };
  await prisma.season.create({ data: season });
};

driverSeeder().finally(async () => await prisma.$disconnect());
