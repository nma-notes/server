import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [FoldersService, PrismaService],
  exports: [FoldersService],
})
export class FoldersModule {}
