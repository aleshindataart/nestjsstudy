import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { FacebookStrategy } from './auth/fb.strategy'
import { FacebookModule } from './facebook/facebook.module'
import { FacebookService } from './facebook/facebook.service'

@Module({
  imports: [FacebookModule],
  controllers: [AppController, AuthController],
  providers: [AppService, FacebookService, FacebookStrategy]
})
export class AppModule {}
