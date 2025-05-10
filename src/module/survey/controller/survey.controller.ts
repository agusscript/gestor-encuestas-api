import { Body, Controller, Post } from "@nestjs/common";
import { SurveyService } from "../service/survey.service";
import { Survey } from "../entity/survey.entity";
import { CreateSurveyDto } from "../dto/create-survey.dto";

@Controller("survey")
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) { }

  @Post()
  async create(
    @Body() createSurveyDto: CreateSurveyDto
  ): Promise<Survey> {
    return this.surveyService.create(createSurveyDto);
  }
}
