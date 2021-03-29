import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('should return the user', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'test',
        password: 'test'
      })
      .expect({
        id: 1,
        username: 'test',
        password: 'test'
      })
  })

  it('should throw an error', async () => {
    return await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'tes',
        password: 'test'
      })
      .expect({
        statusCode: 401,
        message: 'Unauthorized'
      })
  })
})
