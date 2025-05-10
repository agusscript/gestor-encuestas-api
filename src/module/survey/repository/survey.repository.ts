import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entity/survey.entity';

@Injectable()
export class SurveyRepository {
  constructor(
    @InjectRepository(Survey)
    private readonly repository: Repository<Survey>
  ) { }

  async create(survey: Survey): Promise<Survey> {
    return await this.repository.save(survey);
  }
}
