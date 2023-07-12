import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtGuard } from '../auth/guard'
import { GetUser } from '../auth/decorator'
import { User } from '@prisma/client'
import { UserService } from './user.service'
import { RolesGuard } from '../roles/roles.guard'
import { Roles } from '../auth/decorator/roles.decorator'
import { ApiBearerAuth } from '@nestjs/swagger'

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  GetMe(@GetUser() user: User) {
    return user
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/all')
  async getAllUsers() {
    return this.userService.getAllUsers()
  }
}
