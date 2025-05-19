import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateSingleAnswerDto } from "src/module/answer/dto/create-single-answer.dto";

export class CreateAnswerDto {
  @IsUUID("4")
  @IsNotEmpty()
  participationId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSingleAnswerDto)
  answers: CreateSingleAnswerDto[];
}
