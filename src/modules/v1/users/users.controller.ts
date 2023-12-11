import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() data: any) {
		return await this.usersService.create(data);
	}

	@Get(':account_id')
	async findAll(@Param('account_id') account_id: string) {
		return await this.usersService.findAll(account_id);
	}

	@Get(':email/me')
	async me(@Param('email') email: string) {
		return await this.usersService.me(email);
	}

	@Patch(':email/me')
	async updateMe(@Param('email') email: string, @Body() data: any) {
		return await this.usersService.updateMe(email, data);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return await this.usersService.remove(id);
	}
}
