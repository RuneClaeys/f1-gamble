import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeasonDto } from './dto/season.dto';

@Injectable()
export class SeasonsService {
  constructor(private prismaService: PrismaService) {}

  private handleNotFound(err: any, id: string) {
    if (err?.code === 'P2025') {
      throw new NotFoundException(`Season with Id: ${id} does not exist`);
    }
  }

  async getSeasons() {
    return this.prismaService.season.findMany();
  }

  async getSeason(id: string) {
    const season = await this.prismaService.season.findFirst({ where: { id } });

    if (!season) throw new NotFoundException(`Season with Id: ${id} does not exist`);

    return season;
  }

  async createSeason(season: SeasonDto) {
    return await this.prismaService.season.create({ data: season });
  }

  async updateSeason(id: string, seasonDto: SeasonDto) {
    try {
      return await this.prismaService.season.update({ where: { id }, data: seasonDto });
    } catch (err) {
      this.handleNotFound(err, id);
    }
  }

  async deleteSeason(id: string) {
    try {
      return await this.prismaService.season.delete({ where: { id } });
    } catch (err) {
      this.handleNotFound(err, id);
    }
  }
}
