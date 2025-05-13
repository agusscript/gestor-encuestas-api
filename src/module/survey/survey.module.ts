import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Survey } from "./entity/survey.entity";
import { SurveyService } from "./service/survey.service";
import { SurveyRepository } from "./repository/survey.repository";
import { SurveyMapper } from "./mapper/survey.mapper";
import { SurveyController } from "./controller/survey.controller";
import { QuestionModule } from "../question/question.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey]),
    QuestionModule
  ],
  controllers: [SurveyController],
  providers: [
    SurveyService,
    SurveyRepository,
    SurveyMapper,
  ],
  exports: [SurveyService]
})
export class SurveyModule { }
