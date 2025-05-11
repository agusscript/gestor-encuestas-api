import { Injectable } from "@nestjs/common";
import { Question } from "src/module/question/entity/question.entity";
import { OptionRepository } from "../repository/option.repository";
import { OptionMapper } from "../mapper/option.mapper";
import { CreateOptionDto } from "../dto/create-option.dto";
import { Option } from "../entity/option.entity";

@Injectable()
export class OptionService {
  constructor(
    private readonly optionRepository: OptionRepository,
    private readonly optionMapper: OptionMapper,
  ) { }

  async create(
    createOptionDto: CreateOptionDto,
    question: Question
  ): Promise<Option> {
    const mappedOption = this.optionMapper.fromCreateDtoToEntity(
      createOptionDto,
      question
    );

    return await this.optionRepository.create(mappedOption);
  }
}
