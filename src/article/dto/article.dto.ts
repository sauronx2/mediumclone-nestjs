import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ArticleDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsOptional()
  readonly tagList?: string[];
}
