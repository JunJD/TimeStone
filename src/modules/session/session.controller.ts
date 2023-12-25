import { Controller, Get } from '@nestjs/common';
import { SessionService } from './session.service';

import { Public } from '../auth/decorators/public.decorator';

// import { CreateOrderDto } from './dto/create-order.dto';
import { Session } from './common/entity/session.entity';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Public()
  @Get('all')
  getAllSessions(): Promise<Session[]> {
    return this.sessionService.getAllSessions();
  }
}
