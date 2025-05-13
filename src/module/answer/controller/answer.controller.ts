import { Body, Controller, Post } from "@nestjs/common";
import { AnswerService } from "../service/answer.service";
import { Answer } from "../entity/answer.entity";
import { CreateAnswerDto } from "../dto/create-answer.dto";

@Controller("answer")
export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }

  @Post()
  async create(
    @Body() createAnswerDto: CreateAnswerDto,
  ): Promise<Answer[]> {
    return this.answerService.create(
      createAnswerDto
    );
  }
}
