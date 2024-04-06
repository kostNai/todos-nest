import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { hash } from 'bcrypt'
import { TodoEntity } from 'src/todo/todo.entity'
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string
  @Column()
  username: string

  @Column({ default: '' })
  image: string

  @Column()
  password: string

  @BeforeInsert()
  async hashPass() {
    this.password = await hash(this.password, 10)
  }

  @OneToMany(() => TodoEntity, (todo) => todo.author)
  todos: TodoEntity[]
}
123456789
