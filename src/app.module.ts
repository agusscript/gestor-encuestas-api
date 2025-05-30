import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environmentConfig } from './config/environment.config';
import { ENVIRONMENT } from './config/environment.enum';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './config/orm.config';
import { SurveyModule } from './module/survey/survey.module';
import { QuestionModule } from './module/question/question.module';
import { AnswerModule } from './module/answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [environmentConfig],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === ENVIRONMENT.PRODUCTION,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceOptions,
        autoLoadEntities: true,
      }),
    }),
    SurveyModule,
    QuestionModule,
    AnswerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
