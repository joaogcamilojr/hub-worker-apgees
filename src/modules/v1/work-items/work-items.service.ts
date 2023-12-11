import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../global/services';

@Injectable()
export class WorkItemsService {
	constructor(private prisma: PrismaService) {}

	async create(account_id: string, data: any) {
		const { woi_category_id, title, user_id, content } = data;

		const workItem = await this.prisma.work_items.create({
			data: {
				account_id,
				user_id,
				woi_category_id,
				title,
				content,
			},
		});

		return workItem;
	}

	async findAll(account_id: string) {
		const workItems = await this.prisma.work_items.findMany({
			where: { account_id },
		});
		return workItems;
	}

	async update(account_id: string, id: string, data: any) {
		const { checked } = data;

		await this.prisma.work_items.update({
			where: { account_id, id },
			data: { checked },
		});

		return;
	}
}
