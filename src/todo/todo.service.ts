import { Repository } from 'typeorm'
import { TodoEntity } from './todo.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

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
