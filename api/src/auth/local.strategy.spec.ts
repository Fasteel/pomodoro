import { LocalStrategy } from './local.strategy'
import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { userRepository } from '../users/mock/user.repository'
import { User } from '../users/user.entity'
import { UnauthorizedException } from '@nestjs/common'

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        AuthService,
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: userRepository
        }
      ]
    }).compile()

    localStrategy = module.get<LocalStrategy>(LocalStrategy)
  })

  it('should be defined', () => {
    expect(localStrategy).toBeDefined()
  })

  it('should return user', async () => {
    const user = await localStrategy.validate('toto', 'yes')
    expect(user).toBeDefined()
  })

  it('should send UnauthorizedException', async () => {
    async function badUserValidate () {
      await localStrategy.validate('toto', 'es')
    }

    await expect(badUserValidate()).rejects.toThrow(UnauthorizedException)
  })
})
