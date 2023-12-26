import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AssistantService } from './assistant.service';

import { Public } from '../auth/decorators/public.decorator';

// import { CreateOrderDto } from './dto/create-order.dto';
import { Assistant } from './common/entity/assistant.entity';
import { CreateAssistantDto } from './dto/create-assistant.dto';
import { User } from '../user/common/entity/user.entity';

@Controller('assistant')
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Public()
  @Get('all')
  getAllAssistants(): Promise<Assistant[]> {
    return this.assistantService.getAllAssistants();
  }

  @Post('create')
  async createAssistant(
    @Body() createAssistantDto: CreateAssistantDto,
    @Req() req: Request,
  ): Promise<Assistant> {
    return await this.assistantService.createAssistant({
      ...createAssistantDto,
      tags: createAssistantDto.tags.map((item) => item.name).join(','),
      user: (req as unknown as { user: User }).user,
    });
  }
}
