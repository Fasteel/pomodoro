import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'
import { User } from '../user.entity'

type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>
}

const users: User[] = [
  {
    id: new ObjectId(),
    username: 'toto',
    password: 'yes'
  },
  {
    id: new ObjectId(),
    username: 'coucouj',
    password: 'weqr'
  }
]

export const userRepository: () => MockType<Repository<User>> = jest.fn(() => ({
  findOne: jest.fn(where =>
    users.find(user =>
      Object.entries(where).every(([key]) => user[key] === where[key])
    )
  )
}))
