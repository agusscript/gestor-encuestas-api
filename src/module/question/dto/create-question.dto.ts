import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";
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

  @ValidateIf(o => o.type !== QuestionType.OPEN)
  @IsArray()
  @ArrayMinSize(2, {
    message: 'options must contain at least two items',
  })
  @IsString({ each: true })
  options?: string[];
}
