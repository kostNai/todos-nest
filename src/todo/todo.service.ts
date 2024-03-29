import { Injectable } from '@nestjs/common'

@Injectable()
export class TodoService {
  getAll(): string[] {
    return ['Test1', 'Test2', 'Test3', 'test4', 'test5']
  }
}
