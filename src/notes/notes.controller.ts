import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import CreateNoteDto from './dto/create.note.dto';
import UpdateNoteDto from './dto/update.note.dto';

@Controller('folders/:folderId/notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  DEFAULT_TAKE_VALUE = 25;
  DEFAULT_SKIP_VALUE = 0;

  @Get('/')
  async findAll(@Param('folderId') folderId, @Query() params) {
    return this.notesService.findAll(
      folderId,
      +params['take'] || this.DEFAULT_TAKE_VALUE,
      +params['skip'] || this.DEFAULT_SKIP_VALUE,
    );
  }

  @Get('/:id')
  async findById(@Param('folderId') folderId, @Param('id') id) {
    return this.notesService.findById(folderId, id);
  }

  @Post('/')
  async create(@Param('folderId') folderId, @Body() data: CreateNoteDto) {
    return this.notesService.create(folderId, data);
  }

  @Patch('/:id')
  async update(
    @Param('folderId') folderId,
    @Param('id') id,
    @Body() data: UpdateNoteDto,
  ) {
    return this.notesService.update(folderId, id, data);
  }

  @Delete('/:id')
  async delete(@Param('folderId') folderId, @Param('id') id) {
    return this.notesService.delete(folderId, id);
  }
}
