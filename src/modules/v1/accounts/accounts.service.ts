import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from '../../../global/services';

@Injectable()
export class AccountsService {
	constructor(
		private prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cache: Cache,
	) {}

	async create(data: any) {
		const cache_key = `accounts`;

		const account = await this.prisma.accounts.create({
			data: {
				...data,
			},
		});

		await this.cache.del(cache_key);

		return account;
	}

	async findAll() {
		const cache_key = `accounts`;

		const cache_accounts = await this.cache.get(cache_key);

		if (cache_accounts) {
			return cache_accounts;
		}

		const accounts = await this.prisma.accounts.findMany();

		await this.cache.set(cache_key, accounts, 60 * 60 * 12);

		return accounts;
	}

	async findOne(id: string) {
		const cache_key = `account:${id}`;

		const cache_account = await this.cache.get(cache_key);

		if (cache_account) {
			return cache_account;
		}

		const account = await this.prisma.accounts.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				users: {
					select: {
						id: true,
						role: true,
						user: {
							select: {
								id: true,
								email: true,
								name: true,
							},
						},
					},
				},
				apps: {
					select: {
						id: true,
						app: {
							select: {
								id: true,
								name: true,
								scope: true,
							},
						},
					},
				},
			},
		});

		await this.cache.set(cache_key, account, 60 * 60 * 12);

		return account;
	}

	async assign(id: string, { user_id, role }: any) {
		const cache_key = `account:${id}`;

		const account = await this.prisma.users_accounts.upsert({
			where: {
				user_id_account_id: {
					user_id,
					account_id: id,
				},
			},
			update: {
				role,
			},
			create: {
				user: {
					connect: {
						id: user_id,
					},
				},
				account: {
					connect: {
						id,
					},
				},
				role,
			},
		});

		await this.cache.del(cache_key);

		return account;
	}
}
