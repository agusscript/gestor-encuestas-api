import { Injectable } from "@nestjs/common";
import { CreateSurveyDto } from "../dto/create-survey.dto";
import { Survey } from "../entity/survey.entity";

@Injectable()
export class SurveyMapper {
  fromCreateDtoToEntity(
    createSurveyDto: CreateSurveyDto,
  ): Survey {
    const survey = new Survey();

    survey.title = createSurveyDto.title;

    return survey;
  }
}
