import { Injectable } from "@nestjs/common";
import { QuestionRepository } from "../repository/question.repository";
import { QuestionMapper } from "../mapper/question.mapper";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { Question } from "../entity/question.entity";
import { Survey } from "src/module/survey/entity/survey.entity";

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly questionMapper: QuestionMapper,
  ) { }

  async create(
    createQuestionDto: CreateQuestionDto,
    survey: Survey
  ): Promise<Question> {
    const mappedQuestion = this.questionMapper.fromCreateDtoToEntity(
      createQuestionDto,
      survey
    );

    return await this.questionRepository.create(
      mappedQuestion
    );
  }
}
