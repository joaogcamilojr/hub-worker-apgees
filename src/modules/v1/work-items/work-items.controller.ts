import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { WorkItemsService } from './work-items.service';

@Controller('api/v1/account/:account_id/work-items')
export class WorkItemsController {
	constructor(private readonly workItemsService: WorkItemsService) {}

	@Post()
	async create(@Param('account_id') account_id: string, @Body() data: any) {
		return await this.workItemsService.create(account_id, data);
	}

	@Get()
	async findAll(@Param('account_id') account_id: string) {
		return await this.workItemsService.findAll(account_id);
	}

	@Patch(':id')
	async update(
		@Param('account_id') account_id: string,
		@Param('id') id: string,
		@Body() data: any,
	) {
		return await this.workItemsService.update(account_id, id, data);
	}
}
