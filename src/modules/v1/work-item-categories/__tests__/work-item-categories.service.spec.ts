import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../global/services';
import { WorkItemCategoriesService } from '../work-item-categories.service';

describe('WorkItemCategoriesService', () => {
	let service: WorkItemCategoriesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WorkItemCategoriesService,
				{
					provide: PrismaService,
					useValue: {},
				},
			],
		}).compile();

		service = module.get<WorkItemCategoriesService>(WorkItemCategoriesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
