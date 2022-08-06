import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class DriversService {
  constructor(private prismaService: PrismaService) {}

  async getDrivers(seasonId: string) {
    const seasonDrivers = await this.prismaService.seasonDriver.findMany({ where: { seasonId }, include: { driver: true } });
    return seasonDrivers.map((seasonDriver) => seasonDriver.driver);
  }

  async getDriver(seasonId: string, driverId: string) {
    const seasonDriver = await this.prismaService.seasonDriver.findFirstOrThrow({ where: { seasonId, driverId }, include: { driver: true } });
    return seasonDriver.driver;
  }
}
