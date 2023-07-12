import { Controller, Get } from '@nestjs/common'
import { GenresService } from './genres.service'
import { Genre } from './genre.model'

@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get('download')
  async downloadGenres(): Promise<void> {
    await this.genresService.downloadGenres()
  }

  @Get()
  async getGenres(): Promise<Genre[]> {
    return this.genresService.getGenres()
  }
}
