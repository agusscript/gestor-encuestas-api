import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateIf } from "class-validator";
import { Transform } from "class-transformer";

export class CreateSingleAnswerDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  questionId: number;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(255)
  text?: string;

  @ValidateIf(o => !o.text || o.text.trim() === "")
  @IsString({ each: true })
  @IsArray()
  @ArrayMinSize(1, {
    message: "selectedOptions must contain at least one option",
  })
  selectedOptions?: string[];
}
