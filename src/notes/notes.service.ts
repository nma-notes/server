import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Folder } from '.prisma/client';
import CreateNoteDto from './dto/create.note.dto';
import UpdateNoteDto from './dto/update.note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async findAll(folderId: string, take: number, skip: number) {
    return this.prisma.note.findMany({
      where: { folderId },
      take,
      skip,
    });
  }

  async findById(folderId: string, id: string) {
    const result = await this.prisma.note.findFirst({
      where: { id, folderId },
    });

    if (!result)
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);

    return result;
  }

  async create(folderId: string, data: CreateNoteDto) {
    return this.prisma.note.create({
      data: { ...data, folderId },
    });
  }

  async update(folderId: string, id: string, data: UpdateNoteDto) {
    await this.findById(folderId, id);

    return this.prisma.note.update({
      where: { id },
      data,
    });
  }

  async delete(folderId: string, id: string) {
    await this.findById(folderId, id);

    return this.prisma.note.delete({ where: { id } });
  }
}
