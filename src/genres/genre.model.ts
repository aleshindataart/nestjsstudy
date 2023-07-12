import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type GenreDocument = Genre & Document

@Schema()
export class Genre {
  @Prop()
  id: number

  @Prop()
  name: string
}

export const GenreSchema = SchemaFactory.createForClass(Genre)
