import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength, ValidateIf } from "class-validator";

export class CreateSingleAnswerDto {
  @IsUUID("4")
  @IsNotEmpty()
  questionId: string;

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
