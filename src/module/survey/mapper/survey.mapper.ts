import { Injectable } from "@nestjs/common";
import { CreateSurveyDto } from "../dto/create-survey.dto";
import { Survey } from "../entity/survey.entity";

@Injectable()
export class SurveyMapper {
  fromCreateDtoToEntity(
    createSurveyDto: CreateSurveyDto,
    participationId: string,
    visualizationId: string
  ): Survey {
    const survey = new Survey();

    survey.title = createSurveyDto.title;
    survey.participationId = participationId;
    survey.visualizationId = visualizationId;

    return survey;
  }
}
