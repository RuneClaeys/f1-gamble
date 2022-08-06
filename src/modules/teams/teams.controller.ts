import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TeamDto } from './dto/team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private teamService: TeamsService) {}

  @Get()
  getTeams() {
    return this.teamService.getTeams();
  }

  @Get(':id')
  getTeam(@Param('id') id: string) {
    return this.teamService.getTeam(id);
  }

  @Post()
  createTeam(@Body() teamDto: TeamDto) {
    return this.teamService.createTeam(teamDto);
  }

  @Put(':id')
  updateTeam(@Param('id') id: string, @Body() teamDto: TeamDto) {
    return this.teamService.updateTeam(id, teamDto);
  }

  @Delete(':id')
  deleteTeam(@Param('id') id: string) {
    return this.teamService.deleteTeam(id);
  }
}
