import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FacebookStrategy } from './fb.strategy'

@Controller('auth')
export class AuthController {
  constructor(private readonly facebookStrategy: FacebookStrategy) {}

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
