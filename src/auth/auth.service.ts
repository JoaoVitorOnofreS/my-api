import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly jwtService: JwtService;

  async signIn(params: Prisma.UserCreateInput) {
    const user = await this.userService.findByEmail(params.email);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    const passwordMatch = await bcrypt.compare(params.password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Credenciais inválidas');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    const payload = {
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
