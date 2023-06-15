import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsArray()
  @IsNotEmpty()
  roles: string[]
}
