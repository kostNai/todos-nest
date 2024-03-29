import { Controller, Get } from '@nestjs/common'
import { TodoService } from './todo.service'
import { TodoEntity } from './todo.entity'

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getAll(): Promise<TodoEntity[]> {
    return await this.todoService.getAll()
  }
}
