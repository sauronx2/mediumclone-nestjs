import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters long.' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores.' })
  readonly username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Image URL cannot be empty.' })
  readonly image?: string;

  @IsOptional()
  @IsString()
  @Length(0, 160, { message: 'Bio must be 160 characters or less.' })
  readonly bio?: string;
}
