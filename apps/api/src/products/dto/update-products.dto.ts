import { IsOptional, IsString } from 'class-validator';

export class UpdateProductsDto {
  @IsOptional()
  @IsString()
  readonly id_Serial: string;
  @IsOptional()
  @IsString()
  readonly Nombre: string;
  @IsOptional()
  @IsString()
  readonly Categoria: string;
  @IsOptional()
  @IsString()
  readonly Imagen: string;
  @IsOptional()
  @IsString()
  readonly Modelo: string;
  @IsOptional()
  @IsString()
  readonly Serie: string;
  @IsOptional()
  @IsString()
  readonly Marca: string;
  @IsOptional()
  @IsString()
  readonly Fabricante: string;
  @IsOptional()
  @IsString()
  readonly id_Empleado: string;
}
