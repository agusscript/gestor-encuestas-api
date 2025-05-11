import { IsArray, IsNotEmpty, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CreateQuestionDto } from "src/module/question/dto/create-question.dto";
import { Type } from "class-transformer";

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
