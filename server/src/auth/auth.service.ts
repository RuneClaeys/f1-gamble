import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private jwtService: JwtService) {}

  async signUp(authDto: AuthDto) {
    try {
      const hash = await argon.hash(authDto.password);

      const user = await this.prismaService.user.create({
        data: { email: authDto.email, hash },
      });

      return user;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw err;
    }
  }

  async signIn(authDto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: authDto.email },
    });
    if (!user) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(user.hash, authDto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return user;
  }

  async signToken(userId: number) {}
}
