import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from '../entity/option.entity';

@Injectable()
export class OptionRepository {
  constructor(
    @InjectRepository(Option)
    private readonly repository: Repository<Option>
  ) { }

  async create(option: Option): Promise<Option> {
    return await this.repository.save(option);
  }
}
