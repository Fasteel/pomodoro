import { Column, Entity, ObjectIdColumn } from 'typeorm'
import { ObjectId } from 'mongodb'

@Entity()
export default class User {
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  username: string

  @Column()
  password: string
}
