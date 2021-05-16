import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JSDOM } from "jsdom";
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
    const contentArray = this.parseDom(content);

    const translatedArray = this.parseDom(translated);
    for (const [index, value] of contentArray.entries()) {
      const paragraph = new this.paragraphModel({
        order: index,
        content: value,
        translated: translatedArray[index],
      });
      await paragraph.save();
      paragraphs.push(paragraph);
    }
    return paragraphs;
  }

  parseDom(html: string): string[] {
    const dom = new JSDOM(html);
    const strArray = [];
    try {
      const pArray = dom.window.document.getElementsByTagName("p");
      for (const p of pArray) {
        const s = p.textContent;
        strArray.push(s);
      }
      return strArray;
    } catch (error) {
      console.error(error);
      return [];
    }
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
