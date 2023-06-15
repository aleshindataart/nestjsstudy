import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client'
import { RolesGuard } from '../roles/roles.guard'
import { Roles } from '../auth/decorator/roles.decorator'

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  GetMe(@GetUser() user: User) {
    return user
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/all')
  GetAll() {
    return 'all users'
  }
}
