import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import CreateFolderDto from './dto/create.folder.dto';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  async create(folder: CreateFolderDto) {
    return this.prisma.folder.create({ data: { ...folder } });
  }
}
