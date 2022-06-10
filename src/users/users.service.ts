import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import CreateUserDto from './dto/create.user.dto';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  async create(user: CreateUserDto) {
    const { email, password } = user;

    if (await this.findByEmail(email))
      throw new BadRequestException('Email already exists');

    const passwordHash = hashSync(password, 10);
    const result = await this.prisma.user.create({
      data: { email, passwordHash },
    });
    return { id: result.id, email };
  }
}
