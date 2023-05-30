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
