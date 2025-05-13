import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "src/module/question/entity/question.entity";

@Entity({ name: "answer" })
export class Answer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  text: string;

  @Column("simple-array", { nullable: true })
  selectedOptions: string[];

  @ManyToOne(() => Question, q => q.answers, {
    nullable: false,
    onDelete: "CASCADE",
  })
  question: Question;
}
