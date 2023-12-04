import { Module } from '@nestjs/common';
import { PrismaService } from '../../../global/services';
import { WorkItemsController } from './work-items.controller';
import { WorkItemsService } from './work-items.service';

@Module({
	controllers: [WorkItemsController],
	providers: [PrismaService, WorkItemsService],
})
export class WorkItemsModule {}
