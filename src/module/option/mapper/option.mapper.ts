import { Injectable } from "@nestjs/common";
import { Option } from "../entity/option.entity";
import { CreateOptionDto } from "../dto/create-option.dto";
import { Question } from "src/module/question/entity/question.entity";

@Injectable()
export class OptionMapper {
  fromCreateDtoToEntity(
    createOptionDto: CreateOptionDto,
    question: Question
  ): Option {
    const option = new Option();

    option.text = createOptionDto.text;
    option.question = question;

    return option;
  }
}
