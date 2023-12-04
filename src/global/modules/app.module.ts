import { Module } from '@nestjs/common';
import { V1Modules } from '../../modules';
import { AppController } from '../controllers/app.controller';

@Module({
	controllers: [AppController],
	imports: [...V1Modules],
})
export class AppModule {}
