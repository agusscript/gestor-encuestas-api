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

  async findOneByParticipationId(
    participationId: string
  ): Promise<Survey> {
    const survey = await this.repository.findOne({
      where: { participationId },
    });

    if (!survey) {
      throw new NotFoundException(
        `Survey with participation ID ${participationId} not found`
      );
    }

    return survey;
  }

  async findOneByVisualizationId(
    visualizationId: string
  ): Promise<Survey> {
    const survey = await this.repository.findOne({
      where: { visualizationId },
      relations: {
        questions: {
          answers: true
        }
      }
    });

    if (!survey) {
      throw new NotFoundException(
        `Survey with visualization ID ${visualizationId} not found`
      );
    }

    return survey;
  }

  async create(survey: Survey): Promise<Survey> {
    return await this.repository.save(survey);
  }
}
