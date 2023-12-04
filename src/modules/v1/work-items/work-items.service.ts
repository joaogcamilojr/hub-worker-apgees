import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../global/services';

@Injectable()
export class WorkItemsService {
	constructor(private prisma: PrismaService) {}

	async create(data: any) {
		const { woi_category_id, title, userId, content } = data;

		const workItem = await this.prisma.work_items.create({
			data: {
				user_id: userId,
				woi_category_id,
				title,
				content,
			},
		});

		return workItem;
	}

	async findAll() {
		const workItems = await this.prisma.work_items.findMany();
		return workItems;
	}

	async update(id: string, data: any) {
		const { checked } = data;

		await this.prisma.work_items.update({
			where: { id },
			data: { checked },
		});
		return;
	}
}
