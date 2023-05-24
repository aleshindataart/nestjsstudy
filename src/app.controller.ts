import {
  Controller,
  Get,
  Query,
  Redirect,
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
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index.ejs')
  async getIndex(@Query('message') message?: string): Promise<any> {
    return this.appService.getIndex(message || 'getIndex')
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  @Render('index.ejs')
  async facebookLoginRedirect(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<any> {
    const { user } = <any>req
    console.log('== my accessToken', user.accessToken)
    console.log('== my user.id', user.id)
    console.log('== my user.name', user.name)
    graph.setAccessToken(user.accessToken)

    await this.getPermissions()
    const message = await this.getLastPost()
    console.log('== message', message)

    return this.appService.getIndex(message.data || 'redirected')
  }

  @Get('/facebook/permissions')
  @Render('index.ejs')
  async getPermissions(): Promise<any> {
    const data = this.appService.getMyPermissions()
    return this.appService.getIndex(await data)
  }

  @Get('/facebook/myLastPost')
  @UseGuards(AuthGuard('facebook'))
  @Render('index.ejs')
  async getLastPost(): Promise<any> {
    const resp = await this.appService.getLastPost()
    console.log('== facebook/myLastPost resp:', resp)
    return {
      title: 'Hi API tests',
      date: new Date().toDateString(),
      data: resp
    }
    return this.appService.getIndex(resp)
  }

  @Get('/facebook/myMetadata')
  @UseGuards(AuthGuard('facebook'))
  @Render('index.ejs')
  async getMyMetadata(): Promise<any> {
    console.log('= getMyMetadata')
    const myMeta = await this.appService.getMyMetadata()
    console.log('== myMeta', myMeta)
    return this.appService.getIndex(myMeta || 'tba')
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

  @Get('/facebook/klop')
  @Render('index.ejs')
  klop(): { date: string; title: string; data: string } {
    console.log('=klop')
    return { title: 'Klop', date: '--.--.--', data: 'Hello world!' }
  }
  @Get('/facebook/klopd')
  @UseGuards(AuthGuard('facebook'))
  @Render('index.ejs')
  async klopd(): Promise<{ date: string; data: string; title: string }> {
    console.log('=klopd')
    // const data = await this.appService.getLastPost()
    const data = await this.getPost()
    console.log('=klopd data', data)
    return { title: 'Klopd', date: '--.--.--', data: data }
  }

  getPost(): Promise<any> {
    return new Promise((resolve, reject) => {
      graph.get('/me/feed?fields=message,privacy&limit=1', (err, res) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        const message = res.data[0].message
        console.log('= My 1 post:', message)
        resolve('')
      })
    })
  }
}
