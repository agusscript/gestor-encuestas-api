import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ENVIRONMENT } from './environment.enum';
import { Question } from 'src/module/question/entity/question.entity';
import { Survey } from 'src/module/survey/entity/survey.entity';
import { Answer } from 'src/module/answer/entity/answer.entity';

dotenv.config();

const production: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const development: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export const datasourceOptions: DataSourceOptions = (() => {
  if (process.env.NODE_ENV === ENVIRONMENT.PRODUCTION) {
    return production;
  }

  if (process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT) {
    return development;
  }

  throw new Error(
    'Please choose "production" or "development" as your environment',
  );
})();

export default new DataSource({
  ...datasourceOptions,
  entities: [Question, Survey, Answer],
  migrations: ['./migrations/**/*.ts']
});
