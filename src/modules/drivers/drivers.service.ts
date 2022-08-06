import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DriverDto } from './dto/driver.dto';

@Injectable()
export class DriversService {
  constructor(private prismaService: PrismaService) {}

  async getDrivers() {
    return this.prismaService.driver.findMany();
  }

  async getDriver(id: string) {
    return await this.prismaService.driver.findFirstOrThrow({ where: { id } });
  }

  async createDriver(driverDto: DriverDto) {
    return this.prismaService.driver.create({ data: driverDto });
  }

  async updateDriver(id: string, driver: any) {
    return await this.prismaService.driver.update({ where: { id }, data: driver });
  }

  async deleteDriver(id: string) {
    return await this.prismaService.driver.delete({ where: { id } });
  }
}
