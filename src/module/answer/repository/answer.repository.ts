import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from '../entity/answer.entity';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectRepository(Answer)
    private readonly repository: Repository<Answer>
  ) { }

  async create(answer: Answer): Promise<Answer> {
    return await this.repository.save(answer);
  }
}
