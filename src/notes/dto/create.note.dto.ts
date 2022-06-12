import { IsString, NotEquals } from 'class-validator';

export default class CreateNoteDto {
  @IsString()
  @NotEquals(null)
  title: string;

  @IsString()
  content: string;
}
