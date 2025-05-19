import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from '../entity/survey.entity';

@Injectable()
export class SurveyRepository {
  constructor(
    @InjectRepository(Survey)
    private readonly repository: Repository<Survey>
  ) { }

  async findOneById(id: number): Promise<Survey> {
    const survey = await this.repository.findOne({
      where: { id },
      relations: { questions: true }
    });

    if (!survey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    return survey;
  }

  async create(survey: Survey): Promise<Survey> {
    return await this.repository.save(survey);
  }
}
