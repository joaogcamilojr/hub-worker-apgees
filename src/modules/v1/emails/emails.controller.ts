import { Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailsService } from './emails.service';

@Controller()
export class EmailsController {
	constructor(private readonly emailsService: EmailsService) {}

	@MessagePattern('send')
	async send(@Payload() data: any) {
		return await this.emailsService.send(data);
	}

	@Post('send')
	async create(@Payload() data: any) {
		return await this.emailsService.send(data);
	}
}
