import { IsString, IsEmail } from 'class-validator';

export class CreateZentiumApiUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}

