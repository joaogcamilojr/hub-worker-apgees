import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { V1Modules } from '../../modules';
import { AppController } from '../controllers';
import { AppService } from '../services';

@Module({
	imports: [
		CacheModule.register({
			isGlobal: true,
		}),
		...V1Modules,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
