/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Kalau kamu pakai validation di main.ts, jangan lupa pakai di test juga:
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (POST) - create user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'testuser@example.com',
        name: 'Test User',
        role: 'user',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe('testuser@example.com');
        createdUserId = res.body.id;
      });
  });

  it('/users (GET) - get all users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        // Minimal sudah ada user yang kita buat tadi
        expect(res.body.find((u) => u.id === createdUserId)).toBeDefined();
      });
  });

  it('/users/:id (GET) - get one user', () => {
    return request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(createdUserId);
        expect(res.body.email).toBe('testuser@example.com');
      });
  });

  it('/users/:id (PATCH) - update user', () => {
    return request(app.getHttpServer())
      .patch(`/users/${createdUserId}`)
      .send({ name: 'Updated User' })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe('Updated User');
      });
  });

  it('/users/:id (DELETE) - delete user', () => {
    return request(app.getHttpServer())
      .delete(`/users/${createdUserId}`)
      .expect(204);
  });

  it('/users/:id (GET) - get deleted user should 404', () => {
    return request(app.getHttpServer())
      .get(`/users/${createdUserId}`)
      .expect(404);
  });
});
