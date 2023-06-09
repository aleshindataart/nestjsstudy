import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { FacebookStrategy } from './auth/fb.strategy'
import { FacebookModule } from './facebook/facebook.module'
import { FacebookService } from './facebook/facebook.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { AuthService } from './auth/auth.service'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FacebookModule,
    AuthModule,
    UserModule,
    PrismaModule
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    FacebookService,
    FacebookStrategy,
    AuthService,
    JwtService
  ]
})
export class AppModule {}
