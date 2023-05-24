import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import * as ejs from 'ejs'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  // app.engine('ejs', ejs.renderFile)
  app.setViewEngine('ejs')
  await app.listen(4000)
  console.log('Application is running on: http://localhost:4000');
}
bootstrap()
