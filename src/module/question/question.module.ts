import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "./entity/question.entity";
import { QuestionService } from "./service/question.service";
import { QuestionRepository } from "./repository/question.repository";
import { QuestionMapper } from "./mapper/question.mapper";

@Module({
  imports: [
    TypeOrmModule.forFeature([Question])
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
