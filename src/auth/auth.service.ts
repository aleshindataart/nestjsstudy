import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AuthDto } from './dto'
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ConfigEnvService } from '../config.service'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigEnvService
  ) {}
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password)

    // save the new user
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          roles: dto.roles,
          hash
        }
      })

      console.log(user)

      return this.signToken(user.id, user.email)
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw e
    }
  }

  async signin(dto: LoginDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email
      }
    })

    // if the user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect')
    }

    // compare passwords
    const pwMatches = await argon.verify(user.hash, dto.password)
    // if password incorrect throw exception

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect')
    }

    return this.signToken(user.id, user.email)
  }

  async signToken(
    userId: number,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    }

    const secret = this.config.get('JWT_SECRET')

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secret
    })

    // Store the access token as an environment variable
    this.config.set('ACCESS_TOKEN', token)

    return {
      access_token: token
    }
  }
}
