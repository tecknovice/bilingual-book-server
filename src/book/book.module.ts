import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { Book, BookSchema } from "./schemas/book.schema";
import { Chapter, ChapterSchema } from "src/chapter/schemas/chapter.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Chapter.name, schema: ChapterSchema },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
