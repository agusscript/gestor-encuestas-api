import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export class AddSurveySeed1749170641677 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();
        try {
            const surveys = [
                {
                    title: 'Encuesta sobre hábitos de estudio',
                    participationId: uuidv4(),
                    visualizationId: uuidv4(),
                    questions: [
                        { text: '¿Cuál es tu carrera?', type: 'open' },
                        {
                            text: '¿En qué turno cursás?',
                            type: 'single_choice',
                            options: ['Mañana', 'Tarde', 'Noche'],
                        },
                        {
                            text: '¿Qué recursos usás para estudiar?',
                            type: 'multiple_choice',
                            options: ['Apuntes', 'Videos', 'Grupos de estudio'],
                        },
                    ],
                },
                {
                    title: 'Encuesta sobre bienestar estudiantil',
                    participationId: uuidv4(),
                    visualizationId: uuidv4(),
                    questions: [
                        {
                            text: '¿Con qué frecuencia sentís estrés durante el cuatrimestre?',
                            type: 'single_choice',
                            options: ['Nunca', 'A veces', 'Frecuentemente', 'Siempre'],
                        },
                        {
                            text: '¿Qué actividades te ayudan a relajarte?',
                            type: 'multiple_choice',
                            options: ['Deporte', 'Música', 'Meditación', 'Salir con amigos'],
                        },
                    ],
                },
                {
                    title: 'Encuesta sobre herramientas digitales',
                    participationId: uuidv4(),
                    visualizationId: uuidv4(),
                    questions: [
                        {
                            text: '¿Qué plataformas usás para estudiar?',
                            type: 'multiple_choice',
                            options: ['Google Drive', 'Notion', 'Anki', 'Trello'],
                        },
                        {
                            text: '¿Qué herramienta preferís para tomar apuntes?',
                            type: 'single_choice',
                            options: ['Word', 'Notion', 'Manuscrito', 'Otra'],
                        },
                    ],
                },
                {
                    title: 'Encuesta sobre métodos de evaluación',
                    participationId: uuidv4(),
                    visualizationId: uuidv4(),
                    questions: [
                        {
                            text: '¿Qué método de evaluación preferís?',
                            type: 'single_choice',
                            options: ['Parciales', 'Trabajos prácticos', 'Evaluación continua', 'Examen final'],
                        },
                        {
                            text: '¿Te resultan útiles los exámenes tipo múltiple opción?',
                            type: 'single_choice',
                            options: ['Sí', 'No', 'Depende de la materia'],
                        },
                    ],
                },
            ];

            for (const survey of surveys) {
                await queryRunner.query(
                    `
            INSERT INTO "survey" ("title", "participation_id", "visualization_id")
            VALUES ($1, $2, $3)
          `,
                    [survey.title, survey.participationId, survey.visualizationId],
                );

                const result = await queryRunner.query(
                    `SELECT id FROM "survey" WHERE "participation_id" = $1`,
                    [survey.participationId],
                );

                const surveyId = result[0].id;

                for (const question of survey.questions) {
                    await queryRunner.query(
                        `
              INSERT INTO "question" ("text", "type", "options", "survey_id")
              VALUES ($1, $2, $3, $4)
            `,
                        [
                            question.text,
                            question.type,
                            question.options ? question.options.join(',') : null,
                            surveyId,
                        ],
                    );

                    const insertedQuestion = await queryRunner.query(
                        `SELECT id FROM "question" WHERE text = $1 AND "survey_id" = $2`,
                        [question.text, surveyId],
                    );

                    const questionId = insertedQuestion[0].id;

                    for (let i = 0; i < 4; i++) {
                        let text = null;
                        let selectedOptions = null;

                        if (question.type === 'open') {
                            text = `Respuesta abierta de test ${i + 1}`;
                        } else if (question.type === 'single_choice') {
                            const options = question.options;
                            selectedOptions = [options[i % options.length]].join(',');
                        } else if (question.type === 'multiple_choice') {
                            const options = question.options;
                            const count = 1 + (i % (options.length || 1));
                            selectedOptions = options.slice(0, count).join(',');
                        }

                        await queryRunner.query(
                            `
                INSERT INTO "answer" ("text", "selected_options", "question_id")
                VALUES ($1, $2, $3)
              `,
                            [text, selectedOptions, questionId],
                        );
                    }
                }
            }

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DELETE FROM "answer" WHERE "question_id" IN (
        SELECT id FROM "question" WHERE "survey_id" IN (
          SELECT id FROM "survey" WHERE "title" IN (
            'Encuesta sobre hábitos de estudio',
            'Encuesta sobre bienestar estudiantil',
            'Encuesta sobre herramientas digitales',
            'Encuesta sobre métodos de evaluación'
          )
        )
      )
    `);

        await queryRunner.query(`
      DELETE FROM "question" WHERE "survey_id" IN (
        SELECT id FROM "survey" WHERE "title" IN (
          'Encuesta sobre hábitos de estudio',
          'Encuesta sobre bienestar estudiantil',
          'Encuesta sobre herramientas digitales',
          'Encuesta sobre métodos de evaluación'
        )
      )
    `);

        await queryRunner.query(`
      DELETE FROM "survey" WHERE "title" IN (
        'Encuesta sobre hábitos de estudio',
        'Encuesta sobre bienestar estudiantil',
        'Encuesta sobre herramientas digitales',
        'Encuesta sobre métodos de evaluación'
      )
    `);
    }
}
