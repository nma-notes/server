import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaService } from '../prisma.service';
import { FoldersService } from '../folders/folders.service';
import { FoldersModule } from '../folders/folders.module';

@Module({
  providers: [NotesService, PrismaService, FoldersService],
  controllers: [NotesController],
  imports: [FoldersModule],
})
export class NotesModule {}
