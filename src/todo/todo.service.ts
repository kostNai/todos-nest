import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserEntity } from 'src/user/user.entity'
import { CreateTodoDto } from './dto/createTodo.dto'
import { TodoEntity } from './todo.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { TodoResponseInterface } from './types/todoResponse.interface'
import slugify from 'slugify'
import { TodosResponseInterface } from './types/todoesResponse.interface'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async getAll(
    currentUserId: number,
    query: any
  ): Promise<TodosResponseInterface> {
    const queryBuilder = this.todoRepository
      .createQueryBuilder('todos')
      .leftJoinAndSelect('todos.author', 'author')
    const todosCount = await queryBuilder.getCount()

    if (query.limit) {
      queryBuilder.limit(query.limit)
    }
    if (query.offset) {
      queryBuilder.offset(query.offset)
    }

    if (query.author) {
      const author = await this.userRepository.findOneBy({
        username: query.author,
      })
      console.log('author', author)

      queryBuilder.andWhere('todos.authorId = :id', {
        id: author.id,
      })
    }

    if (query.tag) {
      queryBuilder.andWhere('todos.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      })
    }

    queryBuilder.orderBy('todos.createdAt', 'DESC')
    const todos = await queryBuilder.getMany()

    return { todos, todosCount }
  }

  async createTodo(
    currentUser: UserEntity,
    createTodoDto: CreateTodoDto
  ): Promise<TodoEntity> {
    const todo = new TodoEntity()
    Object.assign(todo, createTodoDto)
    if (!todo.tagList) {
      todo.tagList = []
    }

    todo.author = currentUser
    todo.slug = this.getSlug(createTodoDto.title)

    return await this.todoRepository.save(todo)
  }

  buildTodoResponse(todo: TodoEntity): TodoResponseInterface {
    return { todo }
  }
  private getSlug(title: string): string {
    return (
      slugify(title, {
        lower: true,
      }) +
      '-' +
      (Math.random() * Math.pow(36, 6)).toString(36)
    )
  }

  async findBySlug(slug: string): Promise<TodoEntity> {
    return await this.todoRepository.findOne({
      where: {
        slug: slug,
      },
    })
  }

  async deleteTodo(slug: string, currentUserId: number): Promise<DeleteResult> {
    const todo = await this.findBySlug(slug)
    if (!todo) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND)
    }
    if (todo.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN)
    }
    return await this.todoRepository.delete({ slug })
  }

  async updateTodo(
    slug: string,
    updateTodoDto: CreateTodoDto,
    currentUserId
  ): Promise<TodoEntity> {
    const todo = await this.findBySlug(slug)
    if (!todo) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND)
    }
    if (todo.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN)
    }
    Object.assign(todo, updateTodoDto)
    return this.todoRepository.save(todo)
  }
}
