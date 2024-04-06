import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { AuthGuard } from 'src/user/guards/auth.guard'
import { User } from 'src/user/decorators/user.decorator'
import { UserEntity } from 'src/user/user.entity'
import { CreateTodoDto } from './dto/createTodo.dto'
import { TodoResponseInterface } from './types/todoResponse.interface'
import { TodosResponseInterface } from './types/todoesResponse.interface'

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll(
    @User('id') currentUserId: number,
    @Query() query: any
  ): Promise<TodosResponseInterface> {
    return await this.todoService.getAll(currentUserId, query)
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('todo') createTodoDto: CreateTodoDto
  ): Promise<TodoResponseInterface> {
    const todo = await this.todoService.createTodo(currentUser, createTodoDto)

    return this.todoService.buildTodoResponse(todo)
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string): Promise<TodoResponseInterface> {
    const todo = await this.todoService.findBySlug(slug)
    return this.todoService.buildTodoResponse(todo)
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteTodo(
    @User('id') currentUserId: number,
    @Param('slug') slug: string
  ) {
    return await this.todoService.deleteTodo(slug, currentUserId)
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async editTodo(
    @User('id') currentUSerId: number,
    @Param('slug') slug: string,
    @Body('todo') updateTodoDto: CreateTodoDto
  ) {
    const todo = await this.todoService.updateTodo(
      slug,
      updateTodoDto,
      currentUSerId
    )
    return this.todoService.buildTodoResponse(todo)
  }
}
