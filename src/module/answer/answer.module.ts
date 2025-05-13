import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Answer } from "./entity/answer.entity";
import { AnswerService } from "./service/answer.service";
import { AnswerRepository } from "./repository/answer.repository";
import { AnswerMapper } from "./mapper/answer.mapper";
import { QuestionModule } from "../question/question.module";
import { SurveyModule } from "../survey/survey.module";
import { AnswerController } from "./controller/answer.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    QuestionModule,
    SurveyModule
  ],
  controllers: [AnswerController],
  providers: [
    AnswerService,
    AnswerRepository,
    AnswerMapper,
  ],
  exports: []
})
export class AnswerModule { }
