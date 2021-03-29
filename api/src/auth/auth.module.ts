import { Module } from '@nestjs/common'
import { LocalStrategy } from './strategy'
import { AuthController, AuthService } from '.'
import UsersModule, { UserEntity } from '../users'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'pmdr',
      synchronize: true,
      entities: [UserEntity],
      keepConnectionAlive: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export default class AuthModule {}
