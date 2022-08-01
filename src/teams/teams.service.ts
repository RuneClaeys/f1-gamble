import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TeamDto } from './dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(private prismaService: PrismaService) {}

  private handleNotFound(err: any, id: string) {
    if (err?.code === 'P2025') {
      throw new NotFoundException(`Team with Id: ${id} does not exist`);
    }
  }

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
    try {
      return await this.prismaService.team.update({ where: { id }, data: teamDto });
    } catch (err) {
      this.handleNotFound(err, id);
    }
  }

  async deleteTeam(id: string) {
    try {
      return await this.prismaService.team.delete({ where: { id } });
    } catch (err) {
      this.handleNotFound(err, id);
    }
  }
}
