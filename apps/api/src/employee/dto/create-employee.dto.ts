import { IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl, MinLength, MaxLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  Nombre: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  Apellido: string;

  @IsUrl()
  @IsNotEmpty()
  Foto: string;

  @IsEmail()
  @IsNotEmpty()
  Correo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  Direccion: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  Cargo: string;

  @IsNumber()
  @IsNotEmpty()
  Salario: number;
}
