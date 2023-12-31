import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../global/services';

@Injectable()
export class WorkItemCategoriesService {
	constructor(private prisma: PrismaService) {}

	async findAll(account_id: string) {
		const workItemCategories = await this.prisma.work_item_categories.findMany({
			where: { account_id },
		});

		return workItemCategories;
	}
}
