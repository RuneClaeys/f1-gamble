import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), UsersModule, DriversModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
