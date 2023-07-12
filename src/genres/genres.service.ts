import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import axios from 'axios'
import { Genre, GenreDocument } from './genre.model'

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>
  ) {}

  private readonly apiKey = process.env.API_KEY
  private readonly apiUrlGenres = process.env.API_URL_GENRES

  async downloadGenres(): Promise<void> {
    const response = await axios.get(
      `${this.apiUrlGenres}?api_key=${this.apiKey}`
    )

    const genres = response.data.genres
    const genreDocuments = genres.map(genre => ({
      id: genre.id,
      name: genre.name
    }))

    await this.genreModel.deleteMany({})
    await this.genreModel.insertMany(genreDocuments)
  }

  async getGenres(): Promise<Genre[]> {
    return this.genreModel.find().exec()
  }
}
