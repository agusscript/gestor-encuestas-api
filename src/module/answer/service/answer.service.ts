import { BadRequestException, Injectable } from "@nestjs/common";
import { AnswerRepository } from "../repository/answer.repository";
import { Answer } from "../entity/answer.entity";
import { AnswerMapper } from "../mapper/answer.mapper";
import { CreateSingleAnswerDto } from "../dto/create-single-answer.dto";
import { QuestionService } from "src/module/question/service/question.service";
import { CreateAnswerDto } from "../dto/create-answer.dto";
import { SurveyService } from "src/module/survey/service/survey.service";

@Injectable()
export class AnswerService {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly answerMapper: AnswerMapper,
    private readonly questionService: QuestionService,
    private readonly surveyService: SurveyService
  ) { }

  async create(
    createAnswerDto: CreateAnswerDto,
  ): Promise<Answer[]> {
    const { surveyId, answers } = createAnswerDto;
    const createdAnswers: Answer[] = [];

    const survey = await this.surveyService.findOneById(surveyId);

    for (const singleAnswerDto of answers) {
      const answer = await this.createSingle(
        survey.id,
        singleAnswerDto
      );
      createdAnswers.push(answer);
    }

    return createdAnswers;
  }

  private async createSingle(
    surveyId: string,
    createSingleAnswerDto: CreateSingleAnswerDto,
  ): Promise<Answer> {
    const question = await this.questionService.findOneById(
      createSingleAnswerDto.questionId
    );

    if (question.survey.id !== surveyId) {
      throw new BadRequestException(
        "The question does not belong to the survey"
      );
    }

    const mappedAnswer = this.answerMapper.fromCreateSingleDtoToEntity(
      createSingleAnswerDto,
      question
    );

    return await this.answerRepository.create(
      mappedAnswer
    );
  }
}
