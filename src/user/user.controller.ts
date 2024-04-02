import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { UserSrvice } from './user.service'
import { CreateUserDto } from './dto/createUser.dto'
import { UserResponseInterface } from './types/userResponse.Iterface'
import { User } from './decorators/user.decorator'
import { UserEntity } from './user.entity'
import { AuthGuard } from './guards/auth.guard'
import { UpdateUserDto } from './dto/updateUser.dto'

@Controller()
export class UserController {
  constructor(private readonly userSrvice: UserSrvice) {}
  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userSrvice.createUser(createUserDto)
    return this.userSrvice.buildUserResponse(user)
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userSrvice.buildUserResponse(user)
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto
  ): Promise<UserResponseInterface> {
    const user = await this.userSrvice.updateUser(currentUserId, updateUserDto)
    return this.userSrvice.buildUserResponse(user)
  }
}
