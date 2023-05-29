import { Injectable } from '@nestjs/common'
import * as graph from 'fbgraph'

@Injectable()
export class AppService {
  getIndex(token: string): {
    token: string
  } {
    let output,
      accesstoken = 'No access token found. Click "get token" to generate one.'
    if (token) accesstoken = token
    return {
      token: accesstoken
    }
  }

  async getLastPost(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('==> graph access token', graph.getAccessToken())
      graph.get('/me/feed?fields=message,privacy&limit=1', (err, res) => {
        if (err) {
          console.error('Error retrieving posts:', err)
          reject(err)
          return
        }
        console.log('Posts:', res.data[0].message)
        resolve(res.data[0].message)
      })
    })
  }
  async getUserLastPost(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('==> graph access token', graph.getAccessToken())
      const userId = process.env.OTHER_USER_ID
      graph.get(
        `/${userId}/feed?fields=message,privacy&limit=1`,
        (err, res) => {
          if (err) {
            console.error('Error retrieving User Last Post:', err)
            reject(err)
            return
          }
          console.log('Other User Last Post:', res.data[0].message)
          resolve(res.data[0].message)
        }
      )
    })
  }

  async get10LastPosts(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('==> graph access token', graph.getAccessToken())
      graph.get('/me/feed?fields=message,privacy&limit=10', (err, res) => {
        if (err) {
          console.error('Error retrieving posts:', err)
          reject(err)
          return
        }
        const myPosts = []
        res.data.forEach(element => {
          if (element.message) {
            myPosts.push(element.message)
          }
        })
        console.log('My Posts:', myPosts)
        resolve(`<pre>${myPosts.join('\n')}</pre>`)
      })
    })
  }
  async getAlbums(): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log('==> graph access token', graph.getAccessToken())
      graph.get('/me/albums?', (err, res) => {
        if (err) {
          console.error('Error retrieving albums:', err)
          reject(err)
          return
        }
        const myAlbums = []
        const myAlbums2 = []
        res.data.forEach(element => {
          myAlbums.push(element.name)
          myAlbums2.push(JSON.stringify(element))
        })
        console.log('My Albums:', myAlbums)
        console.log('My Albums2:', myAlbums2)
        resolve(`<pre>${myAlbums2.join('\n')}</pre>`)
      })
    })
  }

  async get10GroupPosts(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('==> graph access token', graph.getAccessToken())
      graph.get(
        '/124544070951164/feed?fields=message,privacy&limit=10',
        (err, res) => {
          if (err) {
            console.error('Error retrieving group posts:', err)
            reject(err)
            return
          }
          const myPosts = []
          res.data.forEach(element => {
            if (element.message) {
              myPosts.push(element.message)
            }
          })
          console.log('Group Posts:', myPosts)
          resolve(`<pre>${myPosts.join('\n')}</pre>`)
        }
      )
    })
  }

  async getMyPermissions(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('==> graph access token', graph.getAccessToken())
      graph.get('/me/permissions', (err, res) => {
        if (err) {
          console.error('Error retrieving permissions:', err)
          reject(err)
          return
        }
        console.log('Permissions:', res.data)
        resolve(res.data)
      })
    })
  }

  async getMyMetadata(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('==> graph access token', graph.getAccessToken())
      graph.get('/me?metadata=1', (err, res) => {
        if (err) {
          console.error('Error retrieving metadata:', err)
          reject(err)
          return
        }
        console.log('Metadata:', res.metadata)
        resolve(res.metadata)
      })
    })
  }
}
