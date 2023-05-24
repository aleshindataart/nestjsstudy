import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-facebook'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: '6187923041276646',
      clientSecret: '73af5d9204a5b3e25964e276d3f4630e',
      callbackURL: 'http://localhost:4000/facebook/redirect',
      scope: ['email', 'public_profile', 'user_posts'],
      profileFields: ['emails', 'name']
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails } = profile
    const user = {
      id: profile.id,
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
      accessToken
    }
    done(null, user)
  }
}
