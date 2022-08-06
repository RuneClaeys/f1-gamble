import { Controller, Get, Param } from '@nestjs/common';
import { DriversService } from './drivers.service';

@Controller('seasons/:seasonId/drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Get()
  async getDrivers(@Param('seasonId') seasonId: string) {
    return this.driversService.getDrivers(seasonId);
  }

  @Get(':driverId')
  async getDriver(@Param('seasonId') seasonId: string, @Param('driverId') driverId: string) {
    return this.driversService.getDriver(seasonId, driverId);
  }
}
