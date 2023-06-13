import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  GetMe(@GetUser() user: User) {
    return user
  }

  // @UseGuards(AuthGuard('RolesGuard'))
  @Get('/all')
  GetAll() {
    return 'all users'
  }
}
