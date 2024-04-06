import { IsNotEmpty } from 'class-validator'

export class CreateTodoDto {
  @IsNotEmpty()
  readonly title: string

  @IsNotEmpty()
  readonly desc: string

  @IsNotEmpty()
  readonly body: string

  readonly tagList?: string[]
}
