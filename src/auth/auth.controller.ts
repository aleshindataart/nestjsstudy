import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FacebookStrategy } from './fb.strategy'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'
import { ApiParam } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly facebookStrategy: FacebookStrategy,
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  @ApiParam({ name: 'email', description: 'Email' })
  @ApiParam({ name: 'password', description: 'Password' })
  @ApiParam({ name: 'roles', description: 'Roles' })
  signup(@Body() dto: AuthDto) {
    console.log({
      dto
    })
    return this.authService.signup(dto)
  }

  // noinspection SpellCheckingInspection
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto)
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {}

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginCallback() {
    // Handles the successful authentication redirect
    return "You've successfully logged in Callback"
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect() {
    // Handles the successful authentication redirect
    return "You've successfully logged in to Redirect"
  }
}
