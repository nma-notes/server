import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '.prisma/client';
import CreateUserDto from '../users/dto/create.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && compareSync(password, user.passwordHash)) {
      const { email, id } = user;
      return { email, id };
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
      email: user.email,
    };
  }

  async signup(user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
