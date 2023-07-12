import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import axios from 'axios'
import { Movie, MovieDocument } from './movie.model'
import * as dotenv from 'dotenv'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Logger, transports } from 'winston'

dotenv.config()

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>
  ) {}

  logger = new Logger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs.log' })
    ]
  })

  private readonly apiKey = process.env.API_KEY
  private readonly apiUrlPopular = process.env.API_URL_POPULAR

  @Cron(CronExpression.EVERY_5_MINUTES)
  async downloadMovies(): Promise<void> {
    const response = await axios.get(
      `${this.apiUrlPopular}?api_key=${this.apiKey}`
    )

    const movies = response.data.results.slice(0, 10)
    const movieDocuments = movies.map(movie => ({
      title: movie.title,
      releaseDate: movie.release_date,
      overview: movie.overview,
      adult: movie.adult,
      backdropPath: movie.backdropPath,
      genre_ids: movie.genre_ids,
      id: movie.id,
      original_language: movie.original_language,
      original_title: movie.original_title,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      video: movie.video,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count
    }))

    await this.movieModel.deleteMany({})
    await this.movieModel.insertMany(movieDocuments)
    this.logger.log('info', 'Movies downloaded successfully')
  }

  async getMovies(): Promise<Movie[]> {
    return this.movieModel.find().exec()
  }

  async removeMovies(): Promise<void> {
    await this.movieModel.deleteMany({})
    this.logger.log('info', 'Movies removed successfully')
  }

  @Cron('45 * * * * *')
  handleCron() {
    console.log('Called when the current second is 45')
    this.logger.log('info', 'Called when the current second is 45')
  }
}
