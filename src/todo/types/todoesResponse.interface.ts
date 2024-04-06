import { TodoEntity } from '../todo.entity'

export interface TodosResponseInterface {
  todos: TodoEntity[]
  todosCount: number
}
