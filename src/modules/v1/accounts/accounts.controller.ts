import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('api/v1/accounts')
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	@Post()
	async create(@Body() data: any) {
		return await this.accountsService.create(data);
	}

	@Get()
	async findAll() {
		return await this.accountsService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		return await this.accountsService.findOne(id);
	}

	@Post(':id/assign')
	async assign(@Param('id') id: string, @Body() data: any) {
		return await this.accountsService.assign(id, data);
	}
}
