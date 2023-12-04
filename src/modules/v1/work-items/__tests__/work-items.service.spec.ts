import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../global/services';
import { WorkItemsService } from '../work-items.service';

describe('WorkItemsService', () => {
	let service: WorkItemsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				WorkItemsService,
				{
					provide: PrismaService,
					useValue: {},
				},
			],
		}).compile();

		service = module.get<WorkItemsService>(WorkItemsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
