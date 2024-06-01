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
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './schemas/Employee.schemas';

@Controller('Employee')
export class EmployeeController {
  constructor(private EmployeeService: EmployeeService) {}

  @Get()
  async getAllEmployees(@Query() query: ExpressQuery): Promise<Employee[]> {
    return this.EmployeeService.findAll(query);
  }

  @Post('new')
  async createEmployee(
    @Body()
    Employee: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.EmployeeService.create(Employee);
  }

  @Get(':id')
  async getEmployee(
    @Param('id')
    id: string,
  ): Promise<Employee> {
    return this.EmployeeService.findById(id);
  }

  @Put(':id')
  async UpdateEmployee(
    @Param('id')
    id: string,
    @Body()
    Employee: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.EmployeeService.updateById(id, Employee);
  }
  @Delete(':id')
  async deleteEmployee(
    @Param('id')
    id: string,
  ): Promise<Employee> {
    return this.EmployeeService.deleteById(id);
  }
}
