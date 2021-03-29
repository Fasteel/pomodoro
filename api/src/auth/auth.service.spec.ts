import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '.'
import { UsersService, UserEntity } from '../users'
import { getRepositoryToken } from '@nestjs/typeorm'
import { userRepository } from '../users/mock/user.repository'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
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
