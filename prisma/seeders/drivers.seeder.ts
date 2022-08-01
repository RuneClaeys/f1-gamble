import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const driverSeeder = async (prisma: PrismaClient) => {
  const drivers = await fetch('http://ergast.com/api/f1/2022/drivers.json')
    .then((response) => response.json())
    .then((data: any) =>
      data.MRData.DriverTable.Drivers?.map((d) => {
        delete d.driverId;
        return d;
      }),
    );

  await Promise.all(drivers.map((driver) => prisma.driver.upsert({ where: { code: driver.code }, create: driver, update: driver })));
};

export { driverSeeder };
