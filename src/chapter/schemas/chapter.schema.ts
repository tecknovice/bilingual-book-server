import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Paragraph } from "src/paragraph/schemas/paragraph.schema";

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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Paragraph" }] })
  paragraphs: Paragraph[];
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);
