import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { join } from 'path'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import * as ejs from 'ejs'
dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('ejs')

  const options = new DocumentBuilder()
    .setTitle('NestJS Facebook API')
    .setDescription('My FB API endpoints test')
    .setVersion('0.1')
    .addTag('facebook')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(4000)
  console.log('Application is running on: http://localhost:4000')
}
bootstrap()
