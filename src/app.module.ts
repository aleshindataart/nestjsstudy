import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { FacebookStrategy } from './auth/facebook.strategy'

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, FacebookStrategy]
})
export class AppModule {}
