import { IsString, NotEquals } from 'class-validator';

export default class CreateFolderDto {
  @IsString()
  @NotEquals(null)
  name: string;
}
