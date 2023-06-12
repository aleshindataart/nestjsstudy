import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET')
    })
  }

  async validate(payload: any) {
    // Implement your validation logic here
    // For example, check if the user exists in the database
    // and return the authenticated user object

    // const user = { id: payload.sub, username: payload.username }
    // console.log({
    //   user
    // })
    console.log(payload)
    return payload
  }
}
