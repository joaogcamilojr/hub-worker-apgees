import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../global/services';
import { WorkItemsController } from '../work-items.controller';
import { WorkItemsService } from '../work-items.service';

describe('WorkItemsController', () => {
	let controller: WorkItemsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [WorkItemsController],
			providers: [
				WorkItemsService,
				{
					provide: PrismaService,
					useValue: {},
				},
			],
		}).compile();

		controller = module.get<WorkItemsController>(WorkItemsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
