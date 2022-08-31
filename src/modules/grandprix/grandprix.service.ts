import { Injectable } from '@nestjs/common';
import { GrandPrix } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { grandPrixDto } from './dto/grandprix.dto';

@Injectable()
export class GrandprixService {
  constructor(private prismaService: PrismaService) {}

  async getAllGrandPrix() {
    return await this.prismaService.grandPrix.findMany();
  }

  async getGrandPrix(id: string) {
    return await this.prismaService.grandPrix.findFirstOrThrow({ where: { id } });
  }

  async createGrandPrix(grandPrixDto: grandPrixDto): Promise<GrandPrix> {
    return await this.prismaService.grandPrix.create({ data: grandPrixDto });
  }
}
