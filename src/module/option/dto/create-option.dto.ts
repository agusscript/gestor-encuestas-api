import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  text: string;
}
