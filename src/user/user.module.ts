import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserSrvice } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserSrvice],
})
export class UserModule {}
