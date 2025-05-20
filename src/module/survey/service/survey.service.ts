import { Injectable } from "@nestjs/common";
import { SurveyRepository } from "../repository/survey.repository";
import { Survey } from "../entity/survey.entity";
import { SurveyMapper } from "../mapper/survey.mapper";
import { CreateSurveyDto } from "../dto/create-survey.dto";
import { QuestionService } from "src/module/question/service/question.service";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class SurveyService {
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly surveyMapper: SurveyMapper,
    private readonly questionService: QuestionService,
  ) { }

  async findOneByParticipationId(
    participationId: string
  ): Promise<Survey> {
    return await this.surveyRepository.findOneByParticipationId(
      participationId
    );
  }

  async findOneByVisualizationId(
    visualizationId: string
  ): Promise<Survey> {
    return await this.surveyRepository.findOneByVisualizationId(
      visualizationId
    );
  }

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const participationId = uuidv4();
    const visualizationId = uuidv4();

    const mappedSurvey = this.surveyMapper.fromCreateDtoToEntity(
      createSurveyDto,
      participationId,
      visualizationId
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
