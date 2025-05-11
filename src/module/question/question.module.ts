import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./entity/question.entity";
import { QuestionService } from "./service/question.service";
import { QuestionRepository } from "./repository/question.repository";
import { QuestionMapper } from "./mapper/question.mapper";
import { OptionModule } from "../option/option.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    OptionModule,
  ],
  controllers: [],
  providers: [
    QuestionService,
    QuestionRepository,
    QuestionMapper,
  ],
  exports: [QuestionService]
})
export class QuestionModule { }
