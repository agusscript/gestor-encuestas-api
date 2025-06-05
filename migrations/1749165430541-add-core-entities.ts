import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoreEntities1749165430541 implements MigrationInterface {
    name = 'AddCoreEntities1749165430541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "participation_id" uuid NOT NULL, "visualization_id" uuid NOT NULL, CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer" ("id" SERIAL NOT NULL, "text" character varying, "selected_options" text, "question_id" integer NOT NULL, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."question_type_enum" AS ENUM('open', 'single_choice', 'multiple_choice')`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "type" "public"."question_type_enum" NOT NULL, "options" text, "survey_id" integer NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_a74e5e8dfbf68d7d1cd39c8c9fc" FOREIGN KEY ("survey_id") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_a74e5e8dfbf68d7d1cd39c8c9fc"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TYPE "public"."question_type_enum"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP TABLE "survey"`);
    }
}
