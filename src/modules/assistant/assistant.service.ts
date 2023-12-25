import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assistant } from './common/entity/assistant.entity';

@Injectable()
export class AssistantService {
  constructor(
    @InjectRepository(Assistant)
    private readonly assistantRepo: Repository<Assistant>,
  ) {}
  async getAllAssistants() {
    return await this.assistantRepo.find();
  }
}
