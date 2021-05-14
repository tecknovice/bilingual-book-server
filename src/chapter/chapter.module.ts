import { Module } from "@nestjs/common";
import { ChapterService } from "./chapter.service";
import { ChapterController } from "./chapter.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Chapter, ChapterSchema } from "./schemas/chapter.schema";
import {
  Paragraph,
  ParagraphSchema,
} from "src/paragraph/schemas/paragraph.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chapter.name, schema: ChapterSchema },
      { name: Paragraph.name, schema: ParagraphSchema },
    ]),
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
