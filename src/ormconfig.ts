import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { TodoEntity } from './todo/todo.entity'
import { UserEntity } from './user/user.entity'

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'todo',
  entities: [TodoEntity, UserEntity],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
}

export default config
