import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@UseGuards(JwtAuthGuard)
@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Put("chapter")
  addChapter(@Body() data: any) {
    return this.bookService.addChapter(data);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookService.remove(id);
  }
}
