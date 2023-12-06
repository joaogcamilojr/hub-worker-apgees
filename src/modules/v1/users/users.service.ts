import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../global/services';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(data: any) {
		const existingUser = await this.prisma.users.findUnique({
			where: { email: data.email },
		});

		if (existingUser) {
			throw new BadRequestException('User already exists');
		}

		const user = await this.prisma.users.create({
			data,
		});

		return user;
	}

	async findAll() {
		const users = await this.prisma.users.findMany();
		return users;
	}

	async remove(id: string) {
		const user = await this.prisma.users.delete({
			where: { id },
		});

		return user;
	}
}
