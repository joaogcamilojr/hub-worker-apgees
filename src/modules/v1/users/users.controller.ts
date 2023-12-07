import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() data: any) {
		return await this.usersService.create(data);
	}

	@Get()
	async findAll() {
		return await this.usersService.findAll();
	}

	@Get(':id/me')
	async me(@Param('id') id: string) {
		return await this.usersService.me(id);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.usersService.remove(id);
	}
}
