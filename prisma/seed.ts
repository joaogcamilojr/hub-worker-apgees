import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const keys = ['reminder', 'task', 'user-story'];
	const createdData = await Promise.all(
		keys.map(async (key) => {
			return await prisma.work_item_categories.upsert({
				where: { key },
				update: {},
				create: {
					key,
				},
			});
		}),
	);
	console.log(JSON.stringify(createdData));
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
