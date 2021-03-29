import { Test, TestingModule } from '@nestjs/testing'
import { UsersService, UserEntity } from '.'
import { getRepositoryToken } from '@nestjs/typeorm'
import { userRepository } from './mock/user.repository'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: userRepository
        }
      ]
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should find nobody', async () => {
    const user = await service.findOne('totoo')
    expect(user).toBeUndefined()
  })

  it('should find nobody', async () => {
    const user = await service.findOne('toto')
    expect(user.password).toBe('yes')
  })
})
