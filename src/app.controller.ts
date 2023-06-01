import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { AuthGuard } from '@nestjs/passport'
import * as graph from 'fbgraph'
import { Request, Response } from 'express'

@Controller()
export class AppController {
  private myAccessToken: string
  constructor(private readonly appService: AppService) {}

  @Get()
  async getIndex(@Req() req: Request, @Res() res: Response): Promise<any> {
    const authUrl = graph.getOauthUrl({
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.CALLBACK_URL
    })

    res.redirect(authUrl)
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    const { user } = <any>req
    const code = req.query.code
    graph.setAccessToken(user.accessToken)
    this.myAccessToken = user.accessToken
    return
  }
}
