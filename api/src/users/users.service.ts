import { Injectable } from '@nestjs/common'
import { UserEntity } from './'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export default class UsersService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOne (username: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ username })
  }
}
