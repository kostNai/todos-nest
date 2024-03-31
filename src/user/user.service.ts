import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/createUser.dto'
import { UserEntity } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UserSrvice {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userReposetory: Repository<UserEntity>
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity()
    Object.assign(newUser, createUserDto)
    console.log('new user', newUser)

    return await this.userReposetory.save(newUser)
  }
}
