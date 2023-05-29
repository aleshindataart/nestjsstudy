import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-facebook'
import * as dotenv from 'dotenv'

dotenv.config()


@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: [
        'email',
        'public_profile',
        'user_posts',
        'user_photos',
        'publish_to_groups',
        'groups_access_member_info'
      ],
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
