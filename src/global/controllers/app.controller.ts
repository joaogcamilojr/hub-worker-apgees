import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller()
export class AppController {
	constructor() {}

	@Get()
	@HttpCode(HttpStatus.OK)
	get(): string {
		return 'HUB Apgees Worker!';
	}

	@Post()
	@HttpCode(HttpStatus.OK)
	post(): string {
		return 'HUB Apgees Worker!';
	}
}
