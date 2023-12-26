import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { Session } from './common/entity/session.entity';
import { AssistantModule } from '../assistant/assistant.module';
@Module({
  imports: [TypeOrmModule.forFeature([Session]), AssistantModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
