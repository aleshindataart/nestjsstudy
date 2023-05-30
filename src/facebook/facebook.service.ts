import { Injectable } from '@nestjs/common'
import * as graph from 'fbgraph'
import FbResolvedObject from '../types/fbgraph.types'

@Injectable()
export class FacebookService {
  getAlbums(): Promise<FbResolvedObject> {
    return this.returnPromise('/me/albums', 'albums')
  }

  getMyPermissions(): Promise<FbResolvedObject> {
    return this.returnPromise('/me/permissions', 'permissions')
  }

  getMyMetadata(): Promise<FbResolvedObject> {
    return this.returnPromise('/me?metadata=1', 'metadata', 'metadata')
  }

  getSeveralLastPosts(countPosts = '10'): Promise<FbResolvedObject> {
    return this.returnPromise(
      `/me/feed?fields=message,privacy&limit=${countPosts}`,
      'posts'
    )
  }

  getLastPost(): Promise<FbResolvedObject> {
    return this.returnPromise(
      '/me/feed?fields=message,privacy&limit=2&privacy={"value":"EVERYONE"}',
      'last post'
    )
  }

  private returnPromise(
    uri: string,
    title: string,
    returnNode = 'data'
  ): Promise<FbResolvedObject> {
    return new Promise((resolve, reject) => {
      console.log('==> AccessToken:', graph.getAccessToken())
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
