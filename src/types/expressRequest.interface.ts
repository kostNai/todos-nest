import { UserEntity } from 'src/user/user.entity'
import { Request } from 'express'

export interface ExpressREquestInterface extends Request {
  user?: UserEntity
}
