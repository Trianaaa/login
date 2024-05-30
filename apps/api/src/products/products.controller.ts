/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { ProductsService } from './products.service';
import { Products } from './schemas/products.schemas';

@Controller('Products')
export class ProductsController {
  constructor(private ProductsService: ProductsService) {}

  @Get()
  async getAllProducts(@Query() query: ExpressQuery): Promise<Products[]> {
    return this.ProductsService.findAll(query);
  }

  @Post('new')
  async createProducts(
    @Body()
    Products: CreateProductsDto,
  ): Promise<Products> {
    return this.ProductsService.create(Products);
  }

  @Get(':id')
  async getProducts(
    @Param('id')
    id: string,
  ): Promise<Products> {
    return this.ProductsService.findById(id);
  }

  @Put(':id')
  async UpdateProducts(
    @Param('id')
    id: string,
    @Body()
    Products: UpdateProductsDto,
  ): Promise<Products> {
    return this.ProductsService.updateById(id, Products);
  }

  @Delete(':id')
  async deleteProducts(
    @Param('id')
    id: string,
  ): Promise<Products> {
    return this.ProductsService.deleteById(id);
  }
}
