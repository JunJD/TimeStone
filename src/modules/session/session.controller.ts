import { Body, Controller, Get, Post } from '@nestjs/common';
import { SessionService } from './session.service';

import { Public } from '../auth/decorators/public.decorator';

// import { CreateOrderDto } from './dto/create-order.dto';
import { Session } from './common/entity/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Public()
  @Get('all')
  getAllSessions(): Promise<Session[]> {
    return this.sessionService.getAllSessions();
  }

  @Post('createByAssistant')
  async createSessionByAssistant(@Body() createSessionDto: CreateSessionDto) {
    return await this.sessionService.createSessionByAssistant(
      createSessionDto.assistantId,
      createSessionDto,
    );
  }
}
