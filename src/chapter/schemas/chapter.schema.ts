import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Book } from "src/book/schemas/book.schema";

export type ChapterDocument = Chapter & mongoose.Document;

@Schema()
export class Chapter {
  @Prop()
  order: number;

  @Prop()
  name: string;

  @Prop()
  content: string;

  @Prop()
  translated: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Book" })
  book: Book;
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
