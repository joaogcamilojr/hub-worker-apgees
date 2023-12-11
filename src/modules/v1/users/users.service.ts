import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from '../../../global/services';

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService,
		@Inject(CACHE_MANAGER) private cache: Cache,
	) {}

	async create(data: any) {
		const cache_key = `users`;

		const existingUser = await this.prisma.users.findUnique({
			where: { email: data.email },
		});

		if (existingUser) {
			throw new BadRequestException('User already exists');
		}

		const user = await this.prisma.users.create({
			data,
		});

		await this.cache.del(cache_key);

		return user;
	}

	async findAll(account_id: string) {
		const cache_key = `users`;

		const cache_users = await this.cache.get(cache_key);

		if (cache_users) {
			return cache_users;
		}

		const users = await this.prisma.users.findMany({
			where: { accounts: { some: { account_id } } },
		});

		await this.cache.set(cache_key, users, 60 * 60 * 12);

		return users;
	}

	async me(email: string) {
		const cache_key = `user:${email}`;

		const cache_profile = await this.cache.get(cache_key);

		if (cache_profile) {
			return cache_profile;
		}

		const profile = await this.prisma.users.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				name: true,
				provider: {
					select: {
						id: true,
						sub: true,
						updated_at: true,
					},
				},
				accounts: {
					select: {
						id: true,
						role: true,
						account: {
							select: {
								id: true,
								name: true,
								apps: {
									select: {
										id: true,
										app: {
											select: {
												id: true,
												scope: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		await this.cache.set(cache_key, profile, 60 * 60 * 12);

		return profile;
	}

	async updateMe(email: string, { provider }: any) {
		const cache_key = `user:${email}`;

		await this.prisma.users.update({
			where: { email },
			data: {
				provider: {
					upsert: {
						where: { email },
						create: {
							...provider,
						},
						update: {
							...provider,
						},
					},
				},
			},
		});

		await this.cache.del(cache_key);

		const profile = await this.me(email);

		return profile;
	}

	async remove(id: string) {
		const cache_key = `users`;

		const user = await this.prisma.users.delete({
			where: { id },
		});

		await this.cache.del(cache_key);

		return user;
	}
}
