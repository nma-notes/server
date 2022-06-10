import { IsString, NotEquals } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @NotEquals(null)
  email: string;

  @IsString()
  @NotEquals(null)
  password: string;
}
