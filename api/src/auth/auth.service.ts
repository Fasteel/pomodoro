import { Injectable } from '@nestjs/common'
import { UsersService, UserEntity } from '../users'

@Injectable()
export default class AuthService {
  constructor (private readonly usersService: UsersService) {}

  async validateUser (
    username: string,
    password: string
  ): Promise<UserEntity | undefined> {
    const user = await this.usersService.findOne(username)

    if (!user || user.password !== password) return

    return user
  }
}
