import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from 'src/employee/schemas/employee.schemas';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsSchema } from './schemas/products.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
