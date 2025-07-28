import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsNumber()
  readonly id: number;
  @IsOptional()
  @IsString()
  readonly Nombre: string;
  @IsOptional()
  @IsString()
  readonly Apellido: string;
  @IsOptional()
  @IsString()
  readonly Foto: string;
  @IsOptional()
  @IsString()
  readonly Correo: string;
  @IsOptional()
  @IsString()
  readonly Direccion: string;
  @IsOptional()
  @IsString()
  readonly Cargo: string;
  @IsOptional()
  @IsNumber()
  readonly Salario: number;
}
