import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Chapter } from "src/chapter/schemas/chapter.schema";

export type BookDocument = Book & mongoose.Document;

@Schema()
export class Book {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }] })
  chapters: Chapter[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
