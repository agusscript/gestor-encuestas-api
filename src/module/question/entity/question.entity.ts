import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionType } from "../enum/question-type.enum";
import { Survey } from "src/module/survey/entity/survey.entity";
import { Answer } from "src/module/answer/entity/answer.entity";

@Entity({ name: "question" })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: "enum", enum: QuestionType })
  type: QuestionType;

  @Column("simple-array", { nullable: true })
  options: string[];

  @ManyToOne(() => Survey, s => s.questions, {
    nullable: false,
    onDelete: "CASCADE",
  })
  survey: Survey;

  @OneToMany(() => Answer, a => a.question, {
    cascade: true,
  })
  answers: Answer[];
}
