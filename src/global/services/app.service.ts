import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService implements OnModuleInit {
	constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

	async onModuleInit() {
		await this.cache.reset();
	}

	health(): string {
		return 'HUB Apgees Worker!';
	}

	async resetCache(): Promise<void> {
		await this.cache.reset();
	}
}
