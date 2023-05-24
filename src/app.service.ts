import { Injectable } from '@nestjs/common'
import * as graph from 'fbgraph'

@Injectable()
export class AppService {
  getIndex(data: string): { date: string; title: string; data: string } {
    let output = 'placeholder'
    if (data) output = data
    return {
      title: 'NestJS Facebook Login and API tests',
      date: new Date().toDateString(),
      data: output
    }
  }
  async getLastPost(): Promise<string> {
    return new Promise((resolve, reject) => {
      graph.get('/me/feed?fields=message,privacy&limit=1', (err, res) => {
        if (err) {
          console.error(err)
          reject(err)
          return
        }
        const message = res.data[0].message
        console.log('= Last post:', message)
        resolve(message)
      })
    })
  }

  async getMyPermissions(): Promise<string> {
    return new Promise((resolve, reject) => {
      graph.get('/me/permissions', (err, res) => {
        if (err) {
          console.error('Error on permissions', err)
          reject(err)
          return
        }
        console.log('= Permissions:', res)
        resolve(res)
      })
    })
  }

  getMyMetadata(): Promise<any> {
    return new Promise((resolve, reject) => {
      graph.get('/me?metadata=1', (err, res) => {
        if (err) {
          console.error('= Error retrieving posts:', err)
          reject(err)
          return
        }
        console.log('= Posts:', res.metadata.connections.posts)
        resolve(res.metadata.connections.posts)
      })
    })
  }
}
