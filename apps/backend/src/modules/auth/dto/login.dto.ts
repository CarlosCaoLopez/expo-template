// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'p@ssw0rd', minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;
}
