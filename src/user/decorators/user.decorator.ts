import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { ExpressREquestInterface } from 'src/types/expressRequest.interface'

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const requset = ctx.switchToHttp().getRequest<ExpressREquestInterface>()

  if (!requset.user) {
    return null
  }

  if (data) {
    return requset.user[data]
  }

  return requset.user
})
