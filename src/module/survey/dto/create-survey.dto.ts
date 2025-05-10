import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSurveyDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  title: string;
}
