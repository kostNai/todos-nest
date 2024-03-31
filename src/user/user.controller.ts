import { Body, Controller, Post } from '@nestjs/common'
import { UserSrvice } from './user.service'
import { CreateUserDto } from './dto/createUser.dto'
import { UserEntity } from './user.entity'

@Controller()
export class UserController {
  constructor(private readonly userSrvice: UserSrvice) {}
  @Post('users')
  async createUser(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<UserEntity> {
    return this.userSrvice.createUser(createUserDto)
  }
}
