import { Controller, Get, Param } from '@nestjs/common';
import { WorkItemCategoriesService } from './work-item-categories.service';

@Controller('api/v1/account/:account_id/work-item-categories')
export class WorkItemCategoriesController {
	constructor(
		private readonly workItemCategoriesService: WorkItemCategoriesService,
	) {}

	@Get()
	async findAll(@Param('account_id') account_id: string) {
		return await this.workItemCategoriesService.findAll(account_id);
	}
}
