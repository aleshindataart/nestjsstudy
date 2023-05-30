import { Controller, Get, UseGuards } from '@nestjs/common'
import { FacebookService } from './facebook.service'
import { ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('facebook')
@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}
  private myAccessToken: string

  @Get('/getAlbums')
  async getAlbums(): Promise<any> {
    return this.facebookService.getAlbums()
  }

  @Get('/permissions')
  async getPermissions(): Promise<any> {
    return this.facebookService.getMyPermissions()
  }

  @Get('/myMetadata')
  async getMetadata(): Promise<any> {
    return this.facebookService.getMyMetadata()
  }

  @Get('myLastPost')
  async getLastPost(): Promise<any> {
    return this.facebookService.getLastPost()
  }

  @Get('my10LastPosts')
  async get10LastPosts(): Promise<any> {
    return this.facebookService.get10LastPosts()
  }

  @Get('getToken')
  @UseGuards(AuthGuard('facebook'))
  async getAccessToken(): Promise<any> {
    this.myAccessToken = await this.facebookService.getMyPermissions()
    console.log('=getToken', this.myAccessToken)
  }
}
