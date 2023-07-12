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
import { RolesController } from './roles/roles.controller'
import { Reflector } from '@nestjs/core'
import { ConfigEnvService } from './config.service'
import { GenresModule } from './genres/genres.module'
import { MoviesModule } from './movies/movies.module'
import { DatabaseModule } from './database.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    FacebookModule,
    AuthModule,
    UserModule,
    GenresModule,
    MoviesModule,
    DatabaseModule,
    PrismaModule
  ],
  controllers: [AppController, AuthController, RolesController],
  providers: [
    AppService,
    FacebookService,
    FacebookStrategy,
    AuthService,
    ConfigEnvService,
    JwtService,
    Reflector
  ]
})
export class AppModule {}
