import { BadRequestException, Injectable } from "@nestjs/common";
import { AnswerRepository } from "../repository/answer.repository";
import { Answer } from "../entity/answer.entity";
import { AnswerMapper } from "../mapper/answer.mapper";
import { CreateSingleAnswerDto } from "../dto/create-single-answer.dto";
import { QuestionService } from "src/module/question/service/question.service";
import { CreateAnswerDto } from "../dto/create-answer.dto";
import { SurveyService } from "src/module/survey/service/survey.service";
import { Question } from "src/module/question/entity/question.entity";
import { QuestionType } from "src/module/question/enum/question-type.enum";

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
    surveyId: number,
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

    this.validateAnswerForQuestionType(
      createSingleAnswerDto,
      question
    );

    const mappedAnswer = this.answerMapper.fromCreateSingleDtoToEntity(
      createSingleAnswerDto,
      question
    );

    return await this.answerRepository.create(
      mappedAnswer
    );
  }

  private validateAnswerForQuestionType(
    dto: CreateSingleAnswerDto,
    question: Question
  ): void {
    const { text, selectedOptions } = dto;
    const { type, options } = question;

    if (type === QuestionType.OPEN) {
      if (!text?.trim()) {
        throw new BadRequestException(
          "Open question must have a non-empty text answer"
        );
      }
      return;
    }

    if (type === QuestionType.SINGLE || type === QuestionType.MULTIPLE) {
      if (!Array.isArray(selectedOptions) || selectedOptions.length === 0) {
        throw new BadRequestException(
          `${type === QuestionType.SINGLE ? "Single" : "Multiple"} choice question must have 
          ${type === QuestionType.SINGLE ? "exactly one" : "at least one"} selected option`
        );
      }

      if (type === QuestionType.SINGLE && selectedOptions.length !== 1) {
        throw new BadRequestException(
          "Single choice question must have exactly one selected option"
        );
      }

      const invalid = selectedOptions.filter(opt => !options.includes(opt));
      if (invalid.length > 0) {
        throw new BadRequestException(
          `Invalid selected options: ${invalid.join(", ")}`
        );
      }

      return;
    }

    throw new BadRequestException("Unknown question type");
  }
}
