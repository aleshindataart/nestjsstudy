import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getIndex(token: string): {
    token: string
  } {
    let output,
      accesstoken = 'No access token found. Click "get token" to generate one.'
    if (token) accesstoken = token
    return {
      token: accesstoken
    }
  }
}
