import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Query,
  Param,
  Patch,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import CreateFolderDto from './dto/create.folder.dto';
import { UpdateFolderDto } from './dto/update.folder.dto';

@Controller('folders')
@UseGuards(JwtAuthGuard)
export class FoldersController {
  constructor(private foldersService: FoldersService) {}

  DEFAULT_TAKE_VALUE = 25;
  DEFAULT_SKIP_VALUE = 0;

  @Get('/')
  async findAll(@Query() params, @Request() req) {
    return this.foldersService.findAll(
      req.user,
      +params['take'] || this.DEFAULT_TAKE_VALUE,
      +params['skip'] || this.DEFAULT_SKIP_VALUE,
    );
  }

  @Post('/')
  async create(@Body() createFolderDto: CreateFolderDto, @Request() req) {
    return this.foldersService.create(req.user, createFolderDto);
  }

  @Patch('/:id')
  async update(
    @Param('id') id,
    @Body() updateFolderDto: UpdateFolderDto,
    @Request() req,
  ) {
    return this.foldersService.update(req.user, id, updateFolderDto);
  }

  @Get('/:id')
  async findById(@Param('id') id, @Request() req) {
    return this.foldersService.findById(req.user, id);
  }
}
