import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SeasonDto } from './dto/season.dto';

@Injectable()
export class SeasonsService {
  constructor(private prismaService: PrismaService) {}

  async getSeasons() {
    return this.prismaService.season.findMany();
  }

  async getSeason(id: string) {
    return await this.prismaService.season.findFirstOrThrow({ where: { id } });
  }

  async createSeason(season: SeasonDto) {
    return await this.prismaService.season.create({ data: season });
  }

  async updateSeason(id: string, seasonDto: SeasonDto) {
    return await this.prismaService.season.update({ where: { id }, data: seasonDto });
  }

  async deleteSeason(id: string) {
    return await this.prismaService.season.delete({ where: { id } });
  }
}
