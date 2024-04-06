import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './todo/todo.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from './ormconfig'
import { UserModule } from './user/user.module'
import { AuthMiddleware } from './user/middlewares/auth.middleware'
import { DataSource } from 'typeorm'

@Module({
  imports: [TodoModule, UserModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
