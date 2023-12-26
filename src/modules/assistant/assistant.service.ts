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
    return this.assistantRepo.find();
  }
  async createAssistant(assistant: Partial<Assistant>): Promise<Assistant> {
    return await this.assistantRepo.save(assistant);
  }
  async getAssistantById(assistantId: Assistant['id']) {
    return await this.assistantRepo.findOne({
      where: { id: assistantId },
    });
  }
}
