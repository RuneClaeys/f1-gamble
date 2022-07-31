import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DriverDto } from './dto/driver.dto';

@Injectable()
export class DriversService {
  constructor(private prismaService: PrismaService) {}

  async getDrivers() {
    return this.prismaService.driver.findMany();
  }

  async getDriver(id: string) {
    return this.prismaService.driver.findUnique({
      where: { id },
    });
  }

  async createDriver(driverDto: DriverDto) {
    return this.prismaService.driver.create({
      data: driverDto,
    });
  }

  async updateDriver(id: string, driver: any) {
    return this.prismaService.driver.update({
      where: { id },
      data: driver,
    });
  }

  async deleteDriver(id: string) {
    return this.prismaService.driver.delete({
      where: { id },
    });
  }
}
