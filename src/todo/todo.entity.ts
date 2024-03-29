import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  desc: string
}
