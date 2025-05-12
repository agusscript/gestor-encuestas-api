import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Survey } from "src/module/survey/entity/survey.entity";
import { QuestionType } from "../enum/question-type.enum";

@Entity({ name: "question" })
export class Question {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  text: string;

  @Column({ type: "enum", enum: QuestionType })
  type: QuestionType;

  @ManyToOne(() => Survey, s => s.questions, {
    nullable: false,
    onDelete: "CASCADE",
  })
  survey: Survey;

  @Column("simple-array", { nullable: true })
  options: string[];
}
