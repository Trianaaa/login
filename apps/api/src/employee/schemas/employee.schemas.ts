import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Employee {
  @Prop()
  id: number;
  @Prop()
  Nombre: string;
  @Prop()
  Apellido: string;
  @Prop()
  Foto: string;
  @Prop()
  Correo: string;
  @Prop()
  Direccion: string;
  @Prop()
  Cargo: string;
  @Prop()
  Salario: number;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
