import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Folder } from '.prisma/client';
import CreateNoteDto from './dto/create.note.dto';
import UpdateNoteDto from './dto/update.note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findAll(folder: Folder, take: number, skip: number) {
    return this.prisma.note.findMany({
      where: { folderId: folder.id },
      take,
      skip,
    });
  }

  async findById(folder: Folder, id: string) {
    const result = await this.prisma.note.findFirst({
      where: { id, folderId: folder.id },
    });

    if (!result)
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);

    return result;
  }

  async create(folder: Folder, data: CreateNoteDto) {
    return this.prisma.note.create({
      data: { ...data, folderId: folder.id },
    });
  }

  async update(folder: Folder, id: string, data: UpdateNoteDto) {
    await this.findById(folder, id);

    return this.prisma.note.update({
      where: { id },
      data,
    });
  }

  async delete(folder: Folder, id: string) {
    await this.findById(folder, id);

    return this.prisma.note.delete({ where: { id } });
  }
}
