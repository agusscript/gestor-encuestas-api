import { Injectable } from "@nestjs/common";
import { SurveyRepository } from "../repository/survey.repository";
import { Survey } from "../entity/survey.entity";
import { SurveyMapper } from "../mapper/survey.mapper";
import { CreateSurveyDto } from "../dto/create-survey.dto";
import { v4 as uuid } from "uuid";

@Injectable()
export class SurveyService {
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly surveyMapper: SurveyMapper,
  ) { }

  async create(createSurveyDto: CreateSurveyDto): Promise<Survey> {
    const participationId = uuid();
    const resultId = uuid();

    const mappedSurvey = this.surveyMapper.fromCreateDtoToEntity(
      createSurveyDto,
      participationId,
      resultId,
    );

    return await this.surveyRepository.create(mappedSurvey);
  }
}
