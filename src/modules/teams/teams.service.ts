import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TeamDto } from './dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(private prismaService: PrismaService) {}

  async getTeams() {
    return this.prismaService.team.findMany();
  }

  async getTeam(id: string) {
    const team = await this.prismaService.team.findFirst({ where: { id } });

    if (!team) throw new NotFoundException(`Team with Id: ${id} does not exist`);

    return team;
  }

  async createTeam(team: TeamDto) {
    return this.prismaService.team.create({ data: team });
  }

  async updateTeam(id: string, teamDto: TeamDto) {
    return await this.prismaService.team.update({ where: { id }, data: teamDto });
  }

  async deleteTeam(id: string) {
    return await this.prismaService.team.delete({ where: { id } });
  }
}
