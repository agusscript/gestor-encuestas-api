import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "survey" })
export class Survey {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  participationId: string;

  @Column({ unique: true })
  resultId: string;
}
