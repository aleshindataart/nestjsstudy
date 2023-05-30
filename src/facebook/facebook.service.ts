import { Injectable } from '@nestjs/common'
import * as graph from 'fbgraph'

@Injectable()
export class FacebookService {
  getAlbums(): Promise<string> {
    return this.returnPromise('/me/albums', 'albums')
  }

  getMyPermissions(): Promise<any> {
    return this.returnPromise('/me/permissions', 'permissions')
  }

  getMyMetadata(): Promise<any> {
    return this.returnPromise('/me?metadata=1', 'metadata', 'metadata')
  }

  get10LastPosts(): Promise<any> {
    return this.returnPromise(
      '/me/feed?fields=message,privacy&limit=10',
      'posts'
    )
  }

  getLastPost(): Promise<any> {
    return this.returnPromise(
      '/me/feed?fields=message,privacy&limit=2&privacy={"value":"EVERYONE"}',
      'last post'
    )
  }

  private returnPromise(
    uri: string,
    title: string,
    returnNode = 'data'
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      graph.get(uri, (err, res) => {
        if (err) {
          console.error(`Error retrieving ${title}:`, err)
          reject(err)
          return
        }
        resolve(res[returnNode])
      })
    })
  }
}
