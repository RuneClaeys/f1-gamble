import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prismaService: PrismaService) {}

  async getTeams(seasonId: string) {
    const seasonTeams = await this.prismaService.seasonDriver.findMany({ where: { seasonId }, include: { team: true } });
    return seasonTeams.map((seasonTeam) => seasonTeam.team);
  }

  async getTeam(seasonId: string, teamId: string) {
    const seasonTeam = await this.prismaService.seasonDriver.findFirstOrThrow({ where: { seasonId, teamId }, include: { team: true } });
    return seasonTeam.team;
  }
}
