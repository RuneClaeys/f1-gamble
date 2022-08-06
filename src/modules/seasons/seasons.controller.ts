import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SeasonDto } from './dto/season.dto';
import { SeasonsService } from './seasons.service';

@Controller('seasons')
export class SeasonsController {
  constructor(private seasonService: SeasonsService) {}

  @Get()
  getSeasons() {
    return this.seasonService.getSeasons();
  }

  @Get(':id')
  getSeason(@Param('id') id: string) {
    return this.seasonService.getSeason(id);
  }

  @Post()
  createSeason(@Body() seasonDto: SeasonDto) {
    return this.seasonService.createSeason(seasonDto);
  }

  @Put(':id')
  updateSeason(@Param('id') id: string, @Body() seasonDto: SeasonDto) {
    return this.seasonService.updateSeason(id, seasonDto);
  }

  @Delete(':id')
  deleteSeason(@Param('id') id: string) {
    return this.seasonService.deleteSeason(id);
  }
}
