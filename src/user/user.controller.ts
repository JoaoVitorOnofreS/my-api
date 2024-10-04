import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
@Controller('user')
export class UserController {
  @Inject()
  private readonly UserService: UserService;

  @Get()
  async findAll() {
    return this.UserService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.UserService.findOne(id);
  }

  @Post('create')
  async create(@Body() data: Prisma.UserCreateInput) {
    return this.UserService.create(data);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.UserService.update(id, data);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.UserService.delete(id);

    return {
      statusCode: 200,
      message: 'Usuario deletado',
    };
  }
}
