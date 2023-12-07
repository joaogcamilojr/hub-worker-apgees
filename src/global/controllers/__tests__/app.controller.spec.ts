import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../services/app.service';
import { AppController } from '../app.controller';

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
