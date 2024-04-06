import { DataSource } from 'typeorm'
import { TodoEntity } from './todo/todo.entity'
import { UserEntity } from './user/user.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'todo',
  entities: [TodoEntity, UserEntity],
  synchronize: false,
  migrations: ['./src/migrations/*.ts'],
})
