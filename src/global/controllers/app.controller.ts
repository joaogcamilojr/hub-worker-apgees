import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from '../services';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	get(): string {
		return this.appService.health();
	}

	@Post()
	@HttpCode(HttpStatus.OK)
	post(): string {
		return this.appService.health();
	}

	@Post('reset-cache')
	@HttpCode(HttpStatus.OK)
	async resetCache(): Promise<void> {
		return this.appService.resetCache();
	}
}
