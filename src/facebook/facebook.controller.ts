import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { FacebookService } from './facebook.service'
import { ApiParam, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('facebook')
@Controller('facebook')
export class FacebookController {
  constructor(private readonly facebookService: FacebookService) {}

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

  @Get('mySeveralLastPosts/:count')
  @ApiParam({ name: 'count', description: 'How many posts to request?' })
  async getSeveralLastPosts(@Param('count') count: string): Promise<any> {
    return this.facebookService.getSeveralLastPosts(count)
  }

  @Get('getToken')
  @UseGuards(AuthGuard('facebook'))
  async getAccessToken(): Promise<any> {
    await this.facebookService.getMyPermissions()
  }
}
