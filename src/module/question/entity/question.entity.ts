import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Survey } from "src/module/survey/entity/survey.entity";
import { QuestionType } from "../enum/question-type.enum";
import { Option } from "src/module/option/entity/option.entity";

@Entity({ name: "question" })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column({ type: 'enum', enum: QuestionType })
  type: QuestionType;

  @ManyToOne(() => Survey, s => s.questions, {
    nullable: false,
  })
  survey: Survey;

  @OneToMany(() => Option, o => o.question, {
    cascade: true,
  })
  options: Option[];
}
