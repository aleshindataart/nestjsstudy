import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacebookStrategy } from './facebook.strategy';

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
    }
}
