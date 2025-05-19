import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { CreateSingleAnswerDto } from "src/module/answer/dto/create-single-answer.dto";

export class CreateAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  surveyId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSingleAnswerDto)
  answers: CreateSingleAnswerDto[];
}
