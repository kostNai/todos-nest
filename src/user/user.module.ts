import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserSrvice } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { AuthGuard } from './guards/auth.guard'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserSrvice, AuthGuard],
  exports: [UserSrvice],
})
export class UserModule {}
