import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import CreateFolderDto from './dto/create.folder.dto';
import { User } from '.prisma/client';
import { UpdateFolderDto } from './dto/update.folder.dto';

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

  async findById(currentUser: User, id: string, notes = true) {
    const result = await this.prisma.folder.findFirst({
      where: { id, ownerId: currentUser.id },
      include: { notes },
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

  async update(currentUser: User, id: string, data: UpdateFolderDto) {
    const folder = await this.findById(currentUser, id, false);

    if (!folder)
      throw new HttpException('Folder not found', HttpStatus.NOT_FOUND);

    return this.prisma.folder.update({
      where: { id },
      data,
    });
  }
}
