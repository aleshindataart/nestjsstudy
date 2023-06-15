import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(@Inject(Reflector) private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user

    // user.roles = ['admin', 'user']

    console.log('RolesGuard', roles, user.roles)

    return this.matchRoles(roles, user.roles)
  }

  matchRoles(roles: string[], userRoles: string[]): boolean {
    if (!userRoles) {
      return false // or handle the case when userRoles is undefined
    }
    return roles.every(role => userRoles.includes(role))
  }
}
