import {
  Controller,
  Get,
  Query,
  Render,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from '@nestjs/passport'
import * as graph from 'fbgraph'

@Controller()
export class AppController {
  private myAccessToken: string
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.ejs')
  async getIndex(@Req() req: Request, @Res() res: Response): Promise<any> {
    return this.appService.getIndex(this.myAccessToken)
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    const { user } = <any>req
    console.log('== my accessToken', user.accessToken)
    console.log('== my user.id', user.id)
    console.log('== my user.name', user.name)
    graph.setAccessToken(user.accessToken)
    this.myAccessToken = user.accessToken
    return
  }

  @Get('/facebook/permissions')
  async getPermissions(): Promise<any> {
    return this.appService.getMyPermissions()
  }

  @Get('/facebook/myLastPost')
  async getLastPost(): Promise<any> {
    return this.appService.getLastPost()
  }

  @Get('/facebook/getAlbums')
  async getAlbums(): Promise<any> {
    return this.appService.getAlbums()
  }

  @Get('/facebook/userLastPost')
  async getUserLastPost(): Promise<any> {
    return this.appService.getUserLastPost()
  }

  @Get('/facebook/my10LastPosts')
  async get10LastPosts(): Promise<any> {
    return this.appService.get10LastPosts()
  }

  @Get('/facebook/get10GroupPosts')
  async get10GroupPosts(): Promise<any> {
    return this.appService.get10GroupPosts()
  }

  @Get('/facebook/myMetadata')
  async getMetadata(): Promise<any> {
    return this.appService.getMyMetadata()
  }

  @Get('/facebook/getToken')
  @UseGuards(AuthGuard('facebook'))
  async getAccessToken(): Promise<any> {
    this.myAccessToken = await this.appService.getMyPermissions()
    console.log('=getToken', this.myAccessToken)
  }

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    console.log('=facebookLogin')
  }

  @Get('/facebook/success')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginSuccess(@Req() req: Request): Promise<any> {
    console.log('=facebookLoginSuccess')
  }
}
