import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  readonly Nombre: string;
  @IsNotEmpty()
  @IsString()
  readonly Apellido: string;
  @IsNotEmpty()
  @IsString()
  readonly Foto: string;
  @IsNotEmpty()
  @IsString()
  readonly Correo: string;
  @IsNotEmpty()
  @IsString()
  readonly Direccion: string;
  @IsNotEmpty()
  @IsString()
  readonly Cargo: string;
  @IsNotEmpty()
  @IsNumber()
  readonly Salario: number;
}
