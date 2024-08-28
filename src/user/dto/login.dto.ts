import { IsEmail, IsString, IsNotEmpty, MaxLength, MinLength, IsStrongPassword } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  @IsStrongPassword()
  readonly password: string;
}
