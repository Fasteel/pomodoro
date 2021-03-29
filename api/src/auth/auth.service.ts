import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { User } from 'src/users/user.entity'

@Injectable()
export class AuthService {
  constructor (private readonly usersService: UsersService) {}

  async validateUser (
    username: string,
    password: string
  ): Promise<User | undefined> {
    const user = await this.usersService.findOne(username)

    if (!user || user.password !== password) return

    return user
  }
}
