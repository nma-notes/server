import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { PrismaService } from '../prisma.service';
import { FoldersController } from './folders.controller';

@Module({
  providers: [FoldersService, PrismaService],
  exports: [FoldersService],
  controllers: [FoldersController],
})
export class FoldersModule {}
