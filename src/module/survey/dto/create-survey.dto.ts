import { ArrayMinSize, IsArray, IsNotEmpty, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreateQuestionDto } from "src/module/question/dto/create-question.dto";
import { Type } from "class-transformer";

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  title: string;

  @IsArray()
  @ArrayMinSize(1, {
    message: "questions must contain at least one question",
  })
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
