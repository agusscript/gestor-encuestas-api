import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, ValidateIf, ValidateNested } from "class-validator";
import { QuestionType } from "../enum/question-type.enum";
import { Type } from "class-transformer";
import { CreateOptionDto } from "src/module/option/dto/create-option.dto";

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
  @Type(() => CreateOptionDto)
  @ArrayMinSize(1, {
    message: 'options must contain at least one option'
  })
  options?: CreateOptionDto[];
}
