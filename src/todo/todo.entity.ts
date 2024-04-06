import { UserEntity } from 'src/user/user.entity'
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  slug: string

  @Column({ default: '' })
  desc: string

  @Column({ default: '' })
  body: string

  @Column('simple-array')
  tagList: string[]

  @Column({ default: 0 })
  favoritesCount: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date

  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date()
  }

  @ManyToOne(() => UserEntity, (user) => user.todos, { eager: true })
  author: UserEntity
}
