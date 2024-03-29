import { TypeOrmModuleOptions } from '@nestjs/typeorm'

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456789',
  database: 'todo',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}

export default config
