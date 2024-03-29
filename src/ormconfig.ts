import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'todo',
  password: '123',
  database: 'todo',
}

export default config
