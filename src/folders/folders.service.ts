import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import CreateFolderDto from './dto/create.folder.dto';
import { User } from '.prisma/client';

@Injectable()
export class FoldersService {
  constructor(private prisma: PrismaService) {}

  async findAll(currentUser: User, take: number, skip: number) {
    return this.prisma.folder.findMany({
      take,
      skip,
      where: { ownerId: currentUser.id },
    });
  }

  async findById(currentUser: User, id: string) {
    const result = await this.prisma.folder.findFirst({
      where: { id, ownerId: currentUser.id },
      include: { notes: true },
    });

    if (!result)
      throw new HttpException('Folder not found', HttpStatus.NOT_FOUND);

    return result;
  }

  async create(currentUser: User, folder: CreateFolderDto) {
    return this.prisma.folder.create({
      data: { ...folder, ownerId: currentUser.id },
    });
  }

  async delete(currentUser: User, id: string) {
    return this.prisma.folder.deleteMany({
      where: { id, ownerId: currentUser.id },
    });
  }

  async update(currentUser: User, id: string, folder: CreateFolderDto) {
    return this.prisma.folder.updateMany({
      where: { id, ownerId: currentUser.id },
      data: folder,
    });
  }
}
