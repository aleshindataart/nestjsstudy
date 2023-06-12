import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request } from 'express'

@Controller('users')
export class UserController {
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  GetMe(@Req() req: Request) {
    console.log({
      user: req.user
    })
    return 'user info'
  }

  @UseGuards(AuthGuard('RolesGuard'))
  @Get('/all')
  GetAll() {
    return 'all users'
  }
}
