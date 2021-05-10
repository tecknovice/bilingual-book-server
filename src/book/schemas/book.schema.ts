import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  name: string;

  @Prop()
  content: string;

  @Prop()
  translated: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
