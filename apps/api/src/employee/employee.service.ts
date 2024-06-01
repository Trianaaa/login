import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
import { Employee } from './schemas/employee.schemas';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private EmployeeModel: mongoose.Model<Employee>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll(query: Query): Promise<Employee[]> {
    const resPerPage = 20;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const Employees = await this.EmployeeModel.find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return Employees;
  }

  async create(employee: Employee): Promise<Employee> {
    const res = await this.EmployeeModel.create(employee);
    return res;
  }

  async findById(id: string): Promise<Employee> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const Employee = await this.EmployeeModel.findById(id);

    if (!Employee) {
      throw new NotFoundException('Employee not found.');
    }

    return Employee;
  }

  async updateById(id: string, employee: Employee): Promise<Employee> {
    return await this.EmployeeModel.findByIdAndUpdate(id, employee, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Employee> {
    return await this.EmployeeModel.findByIdAndDelete(id);
  }
}
