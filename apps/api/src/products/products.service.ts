import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import { Employee } from '../employee/schemas/employee.schemas';
import { Products } from './schemas/products.schemas';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private ProductsModel: mongoose.Model<Products>,
    @InjectModel(Employee.name)
    private EmployeeModel: mongoose.Model<Employee>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(query: Query): Promise<Products[]> {
    const resPerPage = 20;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          id_Serial: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const Products = await this.ProductsModel.find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return Products;
  }

  async create(products: Products): Promise<Products> {
    const validatedUser = await this.EmployeeModel.findById(
      products.id_Empleado,
    );

    if (validatedUser === null) {
      throw new BadRequestException('Please enter correct id_empleado.');
    }

    const res = await this.ProductsModel.create(products);
    return res;
  }

  async findById(id: string): Promise<Products> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const Products = await this.ProductsModel.findById(id);

    if (!Products) {
      throw new NotFoundException('Product not found.');
    }

    return Products;
  }

  async updateById(id: string, products: Products): Promise<Products> {
    return await this.ProductsModel.findByIdAndUpdate(id, products, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Products> {
    return await this.ProductsModel.findByIdAndDelete(id);
  }
}
