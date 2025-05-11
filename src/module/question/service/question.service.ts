import { Injectable } from "@nestjs/common";
import { QuestionRepository } from "../repository/question.repository";
import { QuestionMapper } from "../mapper/question.mapper";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { Question } from "../entity/question.entity";
import { Survey } from "src/module/survey/entity/survey.entity";
import { OptionService } from "src/module/option/service/option.service";
import { QuestionType } from "../enum/question-type.enum";

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly questionMapper: QuestionMapper,
    private readonly optionService: OptionService,
  ) { }

  async create(
    createQuestionDto: CreateQuestionDto,
    survey: Survey
  ): Promise<Question> {
    const mappedQuestion = this.questionMapper.fromCreateDtoToEntity(
      createQuestionDto,
      survey
    );

    const createdQuestion = await this.questionRepository.create(
      mappedQuestion
    );

    const { type, options } = createQuestionDto;

    if (type !== QuestionType.OPEN) {
      for (const option of options) {
        await this.optionService.create(option, createdQuestion);
      }
    }

    return createdQuestion;
  }
}
