import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        super({
            clientID: 'your-facebook-app-id',
            clientSecret: 'your-facebook-app-secret',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            scope: ['email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name, emails } = profile;
        const user = {
            email: emails[0].value,
            name: name.givenName + ' ' + name.familyName,
            accessToken,
        };
        done(null, user);
    }
}
