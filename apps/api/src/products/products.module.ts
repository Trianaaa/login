import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsSchema } from './schemas/products.schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule { }