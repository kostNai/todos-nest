import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { ExpressREquestInterface } from 'src/types/expressRequest.interface'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<ExpressREquestInterface>()

    if (request.user) {
      return true
    }
    throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED)
  }
}
