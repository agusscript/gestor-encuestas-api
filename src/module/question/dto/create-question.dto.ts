import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { QuestionType } from "../enum/question-type.enum";

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  text: string;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  type: QuestionType;
}
