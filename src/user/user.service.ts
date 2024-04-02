import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { UserEntity } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from 'src/config'
import { UserResponseInterface } from './types/userResponse.Iterface'
import { UpdateUserDto } from './dto/updateUser.dto'

@Injectable()
export class UserSrvice {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposetory: Repository<UserEntity>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userReposetory.findOne({
      where: {
        email: createUserDto.email,
      },
    })
    const userByUsername = await this.userReposetory.findOne({
      where: {
        username: createUserDto.username,
      },
    })
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }
    const newUser = new UserEntity()
    Object.assign(newUser, createUserDto)

    return await this.userReposetory.save(newUser)
  }
  findBuId(id: number): Promise<UserEntity> {
    return this.userReposetory.findOne({
      where: {
        id: id,
      },
    })
  }
  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET
    )
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    }
  }

  async updateUser(
    userId: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    const user = await this.findBuId(userId)
    Object.assign(user, updateUserDto)
    return await this.userReposetory.save(user)
  }
}
