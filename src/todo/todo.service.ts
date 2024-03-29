import { Injectable } from '@nestjs/common'
import { TodoEntity } from './todo.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {}
  async getAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find()
  }
}
