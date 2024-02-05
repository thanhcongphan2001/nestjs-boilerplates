import { Length, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Lỗi email' })
  email: string;

  name: string;

  password: string;
}
