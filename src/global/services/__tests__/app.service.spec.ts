import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '..';

describe('AppService', () => {
	let service: AppService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AppService,
				{
					provide: 'CACHE_MANAGER',
					useValue: {
						reset: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<AppService>(AppService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
