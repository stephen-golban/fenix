import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    if (username !== 'nikita' && pass !== '1234567890') {
      throw new UnauthorizedException();
    }
    const payload = { sub: 1, username: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
