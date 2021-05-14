import { Module } from "@nestjs/common";
import { ParagraphService } from "./paragraph.service";
import { ParagraphController } from "./paragraph.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Paragraph, ParagraphSchema } from "./schemas/paragraph.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Paragraph.name, schema: ParagraphSchema },
    ]),
  ],
  controllers: [ParagraphController],
  providers: [ParagraphService],
})
export class ParagraphModule {}
