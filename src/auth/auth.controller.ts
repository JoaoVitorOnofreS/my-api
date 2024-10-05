import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: Prisma.UserCreateInput) {
    return this.authService.signIn(body);
  }
}
