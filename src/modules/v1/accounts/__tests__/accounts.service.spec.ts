import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../global/services';
import { AccountsService } from '../accounts.service';

describe('AccountsService', () => {
	let service: AccountsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AccountsService,
				{
					provide: PrismaService,
					useValue: {},
				},
				{
					provide: 'CACHE_MANAGER',
					useValue: {},
				},
			],
		}).compile();

		service = module.get<AccountsService>(AccountsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
