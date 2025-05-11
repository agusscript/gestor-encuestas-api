import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entity/question.entity';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>
  ) { }

  async create(question: Question): Promise<Question> {
    return await this.repository.save(question);
  }
}
