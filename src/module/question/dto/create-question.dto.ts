import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, ValidateIf, ValidateNested } from "class-validator";
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
  @ValidateNested({ each: true })
  @ArrayMinSize(1, {
    message: 'options must contain at least one option'
  })
  options?: string[];
}
