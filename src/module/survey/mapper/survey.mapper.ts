import { Injectable } from "@nestjs/common";
import { CreateSurveyDto } from "../dto/create-survey.dto";
import { Survey } from "../entity/survey.entity";

@Injectable()
export class SurveyMapper {
  fromCreateDtoToEntity(
    surveyDto: CreateSurveyDto,
    participationId: string,
    resultId: string
  ): Survey {
    const survey = new Survey();

    survey.title = surveyDto.title;
    survey.participationId = participationId;
    survey.resultId = resultId; 

    return survey;
  }
}
