import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import CreateFolderDto from './dto/create.folder.dto';
import { User } from '.prisma/client';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  async findAll(owner: User, take: number, skip: number) {
    return this.prisma.folder.findMany({
      take,
      skip,
      where: { ownerId: owner.id },
    });
  }

  async create(folder: CreateFolderDto) {
    return this.prisma.folder.create({ data: { ...folder } });
  }
}
