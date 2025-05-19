import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Question } from "src/module/question/entity/question.entity";

@Entity({ name: "survey" })
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: "uuid",
    nullable: false,
    default: () => "uuid_generate_v4()"
  })
  participationId: string;

  @Column({
    type: "uuid",
    nullable: false,
    default: () => "uuid_generate_v4()"
  })
  visualizationId: string;

  @OneToMany(() => Question, q => q.survey, {
    cascade: true,
  })
  questions: Question[];
}
