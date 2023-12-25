import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AssistantService } from './assistant.service';

import { Public } from '../auth/decorators/public.decorator';

// import { CreateOrderDto } from './dto/create-order.dto';
import { Assistant } from './common/entity/assistant.entity';
import { CreateAssistantDto } from './dto/create-assistant.dto';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly orderService: AssistantService) {}

  @Public()
  @Get('all')
  getAllAssistants(): Promise<Assistant[]> {
    return this.orderService.getAllAssistants();
  }

  @Post('create')
  createAssistant(
    @Body() createAssistantDto: CreateAssistantDto,
    @Req() req: Request,
  ) {
    console.log(createAssistantDto, req);
  }
}
