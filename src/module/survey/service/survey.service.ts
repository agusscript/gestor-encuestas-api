import { Injectable } from "@nestjs/common";
import { SurveyRepository } from "../repository/survey.repository";
import { Survey } from "../entity/survey.entity";
import { SurveyMapper } from "../mapper/survey.mapper";
import { CreateSurveyDto } from "../dto/create-survey.dto";
import { QuestionService } from "src/module/question/service/question.service";

@Injectable()
export class SurveyService {
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly surveyMapper: SurveyMapper,
    private readonly questionService: QuestionService,
  ) { }

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const mappedSurvey = this.surveyMapper.fromCreateDtoToEntity(
      createSurveyDto
    );

    const createdSurvey = await this.surveyRepository.create(
      mappedSurvey
    );

    for (const question of createSurveyDto.questions) {
      await this.questionService.create(question, createdSurvey);
    }

    return createdSurvey;
  }
}
