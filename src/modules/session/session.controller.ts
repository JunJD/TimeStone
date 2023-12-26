import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SessionService } from './session.service';

import { Public } from '../auth/decorators/public.decorator';

// import { CreateOrderDto } from './dto/create-order.dto';
import { Session } from './common/entity/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

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
  @Delete('delete')
  async deleteSession(@Body() deleteSessionDto: { id: Session['id'] }) {
    return await this.sessionService.deleteSessionById(deleteSessionDto.id);
  }
  @Put('update')
  async updateSession(@Body() updateSessionDto: UpdateSessionDto) {
    return await this.sessionService.updateSessionById({
      favorite: updateSessionDto.favorite,
      title: updateSessionDto.title,
      id: updateSessionDto.sessionId,
    });
  }
}
