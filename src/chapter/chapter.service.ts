import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  Paragraph,
  ParagraphDocument,
} from "src/paragraph/schemas/paragraph.schema";
import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { Chapter, ChapterDocument } from "./schemas/chapter.schema";

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name)
    private readonly chapterModel: Model<ChapterDocument>,
    @InjectModel(Paragraph.name)
    private readonly paragraphModel: Model<ParagraphDocument>
  ) {}
  async create(createChapterDto: CreateChapterDto) {
    const createChapter = new this.chapterModel(createChapterDto);
    createChapter.paragraphs = await this.parseChapter(createChapterDto);
    const chapter = await createChapter.save();
    return chapter;
  }
  async parseChapter(createChapterDto: CreateChapterDto): Promise<Paragraph[]> {
    const paragraphs: Paragraph[] = [];
    const { content, translated } = createChapterDto;
    const contentArray = content.replace(/(\r\n|\n|\r)/gm, "").split(".");

    const translatedArray = translated.replace(/(\r\n|\n|\r)/gm, "").split(".");
    // console.log("content length", contentArray.length);
    // console.log("content ", contentArray);
    // console.log("translated length", translatedArray.length);
    // console.log("translated ", translatedArray);
    for (const [index, value] of contentArray.entries()) {
      // console.log("value", value);
      // console.log("translatedArray[index]", translatedArray[index]);
      const paragraph = new this.paragraphModel({
        order: index,
        content: value.trim(),
        translated: translatedArray[index].trim(),
      });
      await paragraph.save();
      paragraphs.push(paragraph);
    }
    return paragraphs;
  }

  findAll() {
    return `This action returns all chapter`;
  }

  async findOne(id: string) {
    let item = await this.chapterModel.findById(id).exec();
    item = await item.populate("paragraphs").execPopulate();
    return item;
  }

  update(id: number, updateChapterDto: UpdateChapterDto) {
    return `This action updates a #${id} chapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} chapter`;
  }
}
