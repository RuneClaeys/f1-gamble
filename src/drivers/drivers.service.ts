import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DriverDto } from './dto/driver.dto';

@Injectable()
export class DriversService {
  constructor(private prismaService: PrismaService) {}

  async getDrivers() {
    return this.prismaService.driver.findMany();
  }

  async getDriver(id: string) {
    const driver = await this.prismaService.driver.findFirst({
      where: { id },
    });

    if (!driver) throw new NotFoundException(`Driver with id: ${id} does not exist`);

    return driver;
  }

  async createDriver(driverDto: DriverDto) {
    return this.prismaService.driver.create({
      data: driverDto,
    });
  }

  async updateDriver(id: string, driver: any) {
    try {
      return await this.prismaService.driver.update({ where: { id }, data: driver });
    } catch (err) {
      if (err?.code === 'P2025') {
        throw new NotFoundException(`Driver with Id: ${id} does not exist`);
      }
    }
  }

  async deleteDriver(id: string) {
    return this.prismaService.driver.delete({
      where: { id },
    });
  }
}
