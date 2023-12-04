import { Module } from '@nestjs/common';
import { PrismaService } from '../../../global/services';
import { WorkItemCategoriesController } from './work-item-categories.controller';
import { WorkItemCategoriesService } from './work-item-categories.service';

@Module({
	controllers: [WorkItemCategoriesController],
	providers: [PrismaService, WorkItemCategoriesService],
})
export class WorkItemCategoriesModule {}
