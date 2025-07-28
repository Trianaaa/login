import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
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
