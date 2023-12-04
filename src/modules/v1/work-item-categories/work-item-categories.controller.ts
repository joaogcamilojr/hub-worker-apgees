import { Controller, Get } from '@nestjs/common';
import { WorkItemCategoriesService } from './work-item-categories.service';

@Controller('api/v1/work-item-categories')
export class WorkItemCategoriesController {
	constructor(
		private readonly workItemCategoriesService: WorkItemCategoriesService,
	) {}

	@Get()
	async findAll() {
		return await this.workItemCategoriesService.findAll();
	}
}
