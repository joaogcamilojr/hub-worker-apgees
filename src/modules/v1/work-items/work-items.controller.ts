import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { WorkItemsService } from './work-items.service';

@Controller('api/v1/work-items')
export class WorkItemsController {
	constructor(private readonly workItemsService: WorkItemsService) {}

	@Post()
	async create(@Body() data: any) {
		return await this.workItemsService.create(data);
	}

	@Get()
	async findAll() {
		return await this.workItemsService.findAll();
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() data: any) {
		return await this.workItemsService.update(id, data);
	}
}
