import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv/config';
import { AppModule } from './global/modules/app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.enableCors();

	const queue = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: [`${process.env.RABBITMQ_URL}`],
				queue: `${process.env.RABBITMQ_EMAIL_QUEUE}`,
				noAck: false,
				queueOptions: {
					durable: true,
				},
			},
		},
	);

	await app.listen(process.env.PORT);

	await queue.listen();
}

bootstrap();
