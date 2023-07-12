import { Controller, Get } from '@nestjs/common'
import { MoviesService } from './movies.service'
import { Movie } from './movie.model'

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('download')
  async downloadMovies(): Promise<void> {
    await this.moviesService.downloadMovies()
  }

  @Get()
  async getMovies(): Promise<Movie[]> {
    return this.moviesService.getMovies()
  }

  @Get('remove')
  async removeMovies(): Promise<void> {
    await this.moviesService.removeMovies()
  }
}
