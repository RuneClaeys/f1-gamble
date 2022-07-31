import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriverDto } from './dto/driver.dto';

@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Get()
  getDrivers() {
    return this.driversService.getDrivers();
  }

  @Get(':id')
  getDriver(@Param('id') id: string) {
    return this.driversService.getDriver(id);
  }

  @Post()
  createDriver(@Body() driver: DriverDto) {
    return this.driversService.createDriver(driver);
  }
}
