import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Question } from "src/module/question/entity/question.entity";

@Entity({ name: "survey" })
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Question, q => q.survey, {
    cascade: true,
  })
  questions: Question[];
}
