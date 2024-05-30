import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Products {
  @Prop()
  id_Serial: string;
  @Prop()
  Nombre: string;
  @Prop()
  Categoria: string;
  @Prop()
  Imagen: string;
  @Prop()
  Modelo: string;
  @Prop()
  Serie: string;
  @Prop()
  Marca: string;
  @Prop()
  Fabricante: string;
  @Prop()
  id_Empleado: string;
}
export const ProductsSchema = SchemaFactory.createForClass(Products);
