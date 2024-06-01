import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsNotEmpty()
  @IsString()
  readonly id_Serial: string;
  @IsNotEmpty()
  @IsString()
  readonly Nombre: string;
  @IsNotEmpty()
  @IsString()
  readonly Categoria: string;
  @IsNotEmpty()
  @IsString()
  readonly Imagen: string;
  @IsNotEmpty()
  @IsString()
  readonly Modelo: string;
  @IsNotEmpty()
  @IsString()
  readonly Serie: string;
  @IsNotEmpty()
  @IsString()
  readonly Marca: string;
  @IsNotEmpty()
  @IsString()
  readonly Fabricante: string;
  @IsNotEmpty()
  @IsString()
  readonly id_Empleado: string;
}
