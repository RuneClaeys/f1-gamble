import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GrandprixService {
  constructor(private prismaService: PrismaService) {}

  async getAllGrandPrix(seasonId: string) {
    const seasonGrandPrix = await this.prismaService.seasonGrandPrix.findMany({ where: { seasonId }, include: { grandPrix: true } });
    return seasonGrandPrix.map((sgp) => sgp.grandPrix);
  }

  async getGrandPrix(seasonId: string, grandPrixId: string) {
    const seasonGrandPrix = await this.prismaService.seasonGrandPrix.findFirstOrThrow({ where: { seasonId, grandPrixId }, include: { grandPrix: true } });
    return seasonGrandPrix.grandPrix;
  }
}
