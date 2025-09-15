/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './jwt-payload.interface';
import { AuthSignInCredentialsDto } from './dto/auth-sign-in-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthSignInCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const user = await this.userRepository.findOneBy({ username });

    if (user && typeof user.password === 'string' && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);

      return { accessToken };
    }

    throw new UnauthorizedException('Please check your login credentials');
  }
}
