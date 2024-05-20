import { IsString, Length, IsNotEmpty } from 'class-validator';

export class AddPostDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 5000)
  readonly content: string;
}
