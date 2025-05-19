import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entity/question.entity';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>
  ) { }

  async findOneById(id: number): Promise<Question> {
    const question = await this.repository.findOne({
      where: { id },
      relations: { survey: true }
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async create(question: Question): Promise<Question> {
    return await this.repository.save(question);
  }
}
