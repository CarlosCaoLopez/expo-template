// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { User } from '../users/entities/user.entity';

@ApiTags('auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log in and obtain a JWT' })
  login(
    @Body() _dto: LoginDto,
    @CurrentUser() user: Omit<User, 'password'>,
  ): { accessToken: string } {
    return this.authService.login(user);
  }

  @Post('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Return the current authenticated user' })
  me(@CurrentUser() user: Omit<User, 'password'>): Omit<User, 'password'> {
    return user;
  }
}
