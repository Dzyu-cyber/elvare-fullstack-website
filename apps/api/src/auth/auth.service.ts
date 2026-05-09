import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.usersService.create({
      email: dto.email,
      name: dto.name,
      passwordHash,
    });

    const tokens = this.generateTokens(user.id, user.role);
    return { user, ...tokens };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = this.generateTokens(user.id, user.role);
    return { user, ...tokens };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const accessToken = this.jwtService.sign(
        { sub: user.id, role: user.role },
        { expiresIn: '15m' },
      );

      return { accessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const { passwordHash, ...result } = user;
    return result;
  }

  async updateMe(userId: string, data: { name?: string; email?: string; password?: string; currentPassword?: string }) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) {
      const existingUser = await this.usersService.findByEmail(data.email);
      if (existingUser && existingUser.id !== userId) {
        throw new BadRequestException('Email already in use');
      }
      updateData.email = data.email;
    }
    if (data.password) {
      if (!data.currentPassword) {
        throw new BadRequestException('Current password is required to change password');
      }
      const isPasswordValid = await bcrypt.compare(data.currentPassword, user.passwordHash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid current password');
      }
      updateData.passwordHash = await bcrypt.hash(data.password, 12);
    }

    const updatedUser = await this.usersService.update(userId, updateData);
    const { passwordHash: _, ...resultUser } = updatedUser;
    return resultUser;
  }

  private generateTokens(userId: string, role: string) {
    const payload = { sub: userId, role };
    
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}
