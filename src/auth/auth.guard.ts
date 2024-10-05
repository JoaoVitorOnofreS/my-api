import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = this.extractTokenFromHeader(request);

    if (!authorization) {
      throw new UnauthorizedException('Token is required');
    }

    try {
      const payload = await this.jwtService.verify(authorization, {
        secret: process.env.JWT_SECRET,
      });
      request.userId = payload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Token is invalid');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    console.log(request.headers);
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
