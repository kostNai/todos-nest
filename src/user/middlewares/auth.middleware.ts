import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { ExpressREquestInterface } from 'src/types/expressRequest.interface'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from 'src/config'
import { UserSrvice } from '../user.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserSrvice) {}
  async use(req: ExpressREquestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null
      next()
      return
    }

    const token = req.headers.authorization
    try {
      const decode = verify(token, JWT_SECRET)
      const user = await this.userService.findBuId(decode.id)
      req.user = user
      next()
    } catch (error) {
      req.user = null
      next()
    }
  }
}
