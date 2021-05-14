import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chapter, ChapterDocument } from "src/chapter/schemas/chapter.schema";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book, BookDocument } from "./schemas/book.schema";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    @InjectModel(Chapter.name)
    private readonly chapterModel: Model<ChapterDocument>
  ) {}

  async create(createBookDto: CreateBookDto) {
    const createdBook = new this.bookModel(createBookDto);
    const book = await createdBook.save();
    return book;
  }

  async addChapter({ bookId, chapterId }: any) {
    console.log(bookId, chapterId);
    const book = await this.bookModel.findById(bookId).exec();
    const chapter = await this.chapterModel.findById(chapterId).exec();
    book.chapters.push(chapter);
    await book.save();
    return true;
  }

  async findAll() {
    const items = await this.bookModel.find().exec();
    return {
      total: items.length,
      items,
    };
  }

  async findOne(id: any) {
    let item = await this.bookModel.findById(id).exec();
    item = await item.populate("chapters").execPopulate();
    return item;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
