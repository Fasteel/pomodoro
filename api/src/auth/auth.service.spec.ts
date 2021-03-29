import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { userRepository } from '../users/mock/user.repository'
import { User } from '../users/user.entity'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: userRepository
        }
      ]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be validated', async () => {
    const validatedUser = await service.validateUser('toto', 'yes')
    expect(validatedUser).toBeDefined()
    expect(validatedUser.username).toBeDefined()
    expect(validatedUser.password).toBeDefined()
  })

  it('should not be validated', async () => {
    const validatedUser = await service.validateUser('totoa', 'yes')
    expect(validatedUser).toBeUndefined()
  })
})
