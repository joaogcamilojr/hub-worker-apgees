import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../global/services';
import { WorkItemCategoriesController } from '../work-item-categories.controller';
import { WorkItemCategoriesService } from '../work-item-categories.service';

describe('WorkItemCategoriesController', () => {
	let controller: WorkItemCategoriesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WorkItemCategoriesController],
			providers: [
				WorkItemCategoriesService,
				{
					provide: PrismaService,
					useValue: {},
				},
			],
		}).compile();

		controller = module.get<WorkItemCategoriesController>(
			WorkItemCategoriesController,
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
