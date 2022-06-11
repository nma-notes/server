import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateFolderDto from './dto/create.folder.dto';

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  @Post('/')
  async create(@Body() createFolderDto: CreateFolderDto, @Request() req) {
    return this.foldersService.create(req.user, createFolderDto);
  }
}
