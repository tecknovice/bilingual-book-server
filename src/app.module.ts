import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { BookModule } from "./book/book.module";
import { ChapterModule } from "./chapter/chapter.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/bilingual-book"),
    AuthModule,
    UsersModule,
    BookModule,
    ChapterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
