import { Injectable } from "@nestjs/common";
import { CreateSingleAnswerDto } from "../dto/create-single-answer.dto";
import { Answer } from "../entity/answer.entity";
import { Question } from "src/module/question/entity/question.entity";

@Injectable()
export class AnswerMapper {
  fromCreateSingleDtoToEntity(
    createSingleAnswerDto: CreateSingleAnswerDto,
    question: Question
  ): Answer {
    const { text, selectedOptions } = createSingleAnswerDto;
    const answer = new Answer();

    answer.text = text;
    answer.selectedOptions = selectedOptions;
    answer.question = question;

    return answer;
  }
}
