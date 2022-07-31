import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

const driverSeeder = async () => {
  const drivers = await fetch('http://ergast.com/api/f1/2022/drivers.json')
    .then((response) => response.json())
    .then((data: any) =>
      data.MRData.DriverTable.Drivers?.map((d) => {
        delete d.driverId;
        return d;
      }),
    );

  await prisma.driver.createMany({ data: drivers });
};

driverSeeder().finally(async () => await prisma.$disconnect());
