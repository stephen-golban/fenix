import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    if (username !== process.env.EMAIL && pass !== process.env.PASSWORD) {
      throw new UnauthorizedException();
    }
    const payload = { sub: 1, username: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
