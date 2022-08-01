import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DriverDto } from './dto/driver.dto';

@Injectable()
export class DriversService {
  constructor(private prismaService: PrismaService) {}

  private handleNotFound(err: any, id: string) {
    if (err?.code === 'P2025') {
      throw new NotFoundException(`Driver with Id: ${id} does not exist`);
    }
  }

  async getDrivers() {
    return this.prismaService.driver.findMany();
  }

  async getDriver(id: string) {
    try {
      return await this.prismaService.driver.findFirstOrThrow({ where: { id } });
    } catch (err) {
      this.handleNotFound(err, id);
    }
  }

  async createDriver(driverDto: DriverDto) {
    return this.prismaService.driver.create({ data: driverDto });
  }

  async updateDriver(id: string, driver: any) {
    try {
      return await this.prismaService.driver.update({ where: { id }, data: driver });
    } catch (err) {
      this.handleNotFound(err, id);
    }
  }

  async deleteDriver(id: string) {
    try {
      return await this.prismaService.driver.delete({ where: { id } });
    } catch (err) {
      this.handleNotFound(err, id);
    }
  }
}
