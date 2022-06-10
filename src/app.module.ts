import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { FoldersModule } from './folders/folders.module';

@Module({
  imports: [AuthModule, UsersModule, FoldersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
