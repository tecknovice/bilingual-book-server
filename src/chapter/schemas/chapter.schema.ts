import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

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
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
