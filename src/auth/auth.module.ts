import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { FacebookStrategy } from './fb.strategy'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './strategy'
import { ConfigEnvService } from '../config.service'

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, FacebookStrategy, JwtStrategy, ConfigEnvService]
})
export class AuthModule {}
