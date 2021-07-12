import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateChapterDto } from "./dto/create-chapter.dto";
import { UpdateChapterDto } from "./dto/update-chapter.dto";
import { Chapter, ChapterDocument } from "./schemas/chapter.schema";

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name)
    private readonly chapterModel: Model<ChapterDocument>
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    const createChapter = new this.chapterModel(createChapterDto);
    const chapter = await createChapter.save();
    return chapter;
  }

  findAll() {
    return `This action returns all chapter`;
  }

  async findOne(id: string) {
    let item = await this.chapterModel.findById(id).exec();
    item = await item.populate("paragraphs").execPopulate();
    return item;
  }

  async update(id: string, updateChapterDto: UpdateChapterDto) {
    await this.chapterModel.findByIdAndUpdate(id, { ...updateChapterDto });
    return updateChapterDto;
  }

  async remove(id: string) {
    await this.chapterModel.findByIdAndDelete(id);
    return true;
  }
}
