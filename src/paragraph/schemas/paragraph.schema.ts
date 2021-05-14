import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ParagraphDocument = Paragraph & Document;

@Schema()
export class Paragraph {
  @Prop()
  order: number;

  @Prop()
  content: string;

  @Prop()
  translated: string;
}

export const ParagraphSchema = SchemaFactory.createForClass(Paragraph);
