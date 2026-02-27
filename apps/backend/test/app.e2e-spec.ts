// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import { Test, type TestingModule } from '@nestjs/testing';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import type { Server } from 'http';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({ type: VersioningType.URI });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api/health returns 200', () => {
    return request(app.getHttpServer() as Server)
      .get('/api/health')
      .expect(200);
  });

  it('POST /api/v1/users/register creates a user', () => {
    return request(app.getHttpServer() as Server)
      .post('/api/v1/users/register')
      .send({ email: 'test@example.com', name: 'Test User', password: 'p@ssw0rd123' })
      .expect(201);
  });

  it('POST /api/v1/auth/login returns a JWT', () => {
    return request(app.getHttpServer() as Server)
      .post('/api/v1/auth/login')
      .send({ email: 'test@example.com', password: 'p@ssw0rd123' })
      .expect(200)
      .expect((res: { body: { data: Record<string, unknown> } }) => {
        expect(res.body.data).toHaveProperty('accessToken');
      });
  });
});
