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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('user')
export class UserController {
  @Inject()
  private readonly UserService: UserService;

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.UserService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.UserService.findOne(id);
  }

  @Post('create')
  async create(@Body() data: Prisma.UserCreateInput) {
    return this.UserService.create(data);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.UserService.update(id, data);
  }

  @UseGuards(AuthGuard)
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
