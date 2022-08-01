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

  private seasonMapper(season: any) {
    return {
      id: season.id,
      name: season.name,
      year: season.year,
      teams: season.seasonDriver.map((sd) => {
        return {
          id: sd.team.id,
          name: sd.team.name,
          drivers: sd.team.seasonDriver.map((sd2) => {
            return sd2.driver;
          }),
        };
      }),
    };
  }

  async getSeasons() {
    return this.prismaService.season.findMany();
  }

  async getSeason(id: string) {
    const season = await this.prismaService.season.findFirst({
      where: { id },
      include: {
        _count: true,
        seasonDriver: {
          include: {
            team: {
              include: {
                seasonDriver: {
                  include: {
                    driver: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!season) throw new NotFoundException(`Season with Id: ${id} does not exist`);

    return this.seasonMapper(season);
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
