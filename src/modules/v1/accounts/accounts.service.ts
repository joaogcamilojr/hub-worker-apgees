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

		const accounts = await this.prisma.accounts.findMany({
			select: {
				id: true,
				name: true,
				locale: true,
				status: true,
				created_at: true,
				updated_at: true,
				deleted_at: true,
				_count: {
					select: {
						users: true,
						apps: true,
					},
				},
			},
		});

		const parsedAccounts = accounts.map(({ _count, ...a }) => ({
			...a,
			count: _count,
		}));

		await this.cache.set(cache_key, parsedAccounts, 60 * 60 * 12);

		return parsedAccounts;
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
				locale: true,
				status: true,
				created_at: true,
				updated_at: true,
				deleted_at: true,
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

	async update(id: string, data: any) {
		const { name } = data;
		const cache_key = `account:${id}`;

		const { _count: count, ...account } = await this.prisma.accounts.update({
			where: {
				id,
			},
			data: {
				name,
			},
			select: {
				id: true,
				name: true,
				locale: true,
				status: true,
				created_at: true,
				updated_at: true,
				deleted_at: true,
				_count: {
					select: {
						users: true,
						apps: true,
					},
				},
			},
		});

		await this.cache.del(cache_key);
		await this.cache.del('accounts');

		return { ...account, count };
	}

	async status(id: string, status: number) {
		const cache_key = `account:${id}`;

		const { _count: count, ...account } = await this.prisma.accounts.update({
			where: {
				id,
			},
			data: {
				status,
			},
			select: {
				id: true,
				name: true,
				locale: true,
				status: true,
				created_at: true,
				updated_at: true,
				deleted_at: true,
				_count: {
					select: {
						users: true,
						apps: true,
					},
				},
			},
		});

		await this.cache.del(cache_key);
		await this.cache.del('accounts');

		return { ...account, count };
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
		await this.cache.del('accounts');

		return account;
	}
}
