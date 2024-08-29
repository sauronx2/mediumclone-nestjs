import { IsEmail, IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  readonly password: string;
}
