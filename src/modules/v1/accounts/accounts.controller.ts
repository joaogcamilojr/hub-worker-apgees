import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import {
	CreateAccountInputDto,
	CreateAccountOutputDto,
	UpdateAccountInputDto,
	UpdateAccountOutputDto,
} from './dto';

@Controller('api/v1/accounts')
export class AccountsController {
	constructor(private readonly accountsService: AccountsService) {}

	@Post()
	async create(
		@Body() body: CreateAccountInputDto,
	): Promise<CreateAccountOutputDto> {
		const { name } = body;
		const response = await this.accountsService.create({
			name,
		});
		return response;
	}

	@Get()
	async findAll() {
		const response = await this.accountsService.findAll();
		return response;
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const response = await this.accountsService.findOne(id);
		return response;
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() data: UpdateAccountInputDto,
	): Promise<UpdateAccountOutputDto> {
		const response = await this.accountsService.update(id, data);
		return response;
	}

	@Post(':id/status')
	async status(@Param('id') id: string, @Body() data: any) {
		const { status } = data;
		const response = await this.accountsService.status(id, status);
		return response;
	}

	@Post(':id/assign')
	async assign(@Param('id') id: string, @Body() data: any) {
		const response = await this.accountsService.assign(id, data);
		return response;
	}
}
