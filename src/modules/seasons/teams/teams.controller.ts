import { Controller, Get, Param } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('seasons/:seasonId/teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  async getTeams(@Param('seasonId') seasonId: string) {
    return this.teamsService.getTeams(seasonId);
  }

  @Get(':teamId')
  async getTeam(@Param('seasonId') seasonId: string, @Param('teamId') teamId: string) {
    return this.teamsService.getTeam(seasonId, teamId);
  }
}
