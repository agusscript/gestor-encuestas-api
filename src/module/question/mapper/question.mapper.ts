import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "../dto/create-question.dto";
import { Question } from "../entity/question.entity";
import { Survey } from "src/module/survey/entity/survey.entity";

@Injectable()
export class QuestionMapper {
  fromCreateDtoToEntity(
    createQuestionDto: CreateQuestionDto,
    survey: Survey
  ): Question {
    const { text, type } = createQuestionDto;
    const question = new Question();

    question.text = text;
    question.type = type;
    question.survey = survey;

    return question;
  }
}
