import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './common/entity/session.entity';
import { Assistant } from '../assistant/common/entity/assistant.entity';
import { AssistantService } from '../assistant/assistant.service';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    private assistantService: AssistantService,
  ) {}
  async getAllSessions() {
    return await this.sessionRepo.find();
  }
  async createSessionByAssistant(
    assistantId: Assistant['id'],
    session: Partial<Session>,
  ) {
    const assistant = await this.assistantService.getAssistantById(assistantId);
    return await this.sessionRepo.save({ ...session, assistant });
  }
}
