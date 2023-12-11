import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '..';
import { AppService } from '../../services';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
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

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "HUB Apgees Worker!"', () => {
			expect(appController.get()).toBe('HUB Apgees Worker!');
		});

		it('should return "HUB Apgees Worker!"', () => {
			expect(appController.post()).toBe('HUB Apgees Worker!');
		});
	});
});
