import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { SurveyService } from "../service/survey.service";
import { Survey } from "../entity/survey.entity";
import { CreateSurveyDto } from "../dto/create-survey.dto";

@Controller("survey")
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) { }

  @Get()
  async findAll(): Promise<Survey[]> {
    return this.surveyService.findAll();
  }

  @Get("participation/:id")
  async findOneByParticipationId(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<Survey> {
    return this.surveyService.findOneByParticipationId(id);
  }

  @Get("visualization/:id")
  async findOneByVisualizationId(
    @Param("id", ParseUUIDPipe) id: string
  ): Promise<Survey> {
    return this.surveyService.findOneByVisualizationId(id);
  }

  @Post()
  async create(
    @Body() createSurveyDto: CreateSurveyDto
  ): Promise<Survey> {
    return this.surveyService.create(createSurveyDto);
  }
}
