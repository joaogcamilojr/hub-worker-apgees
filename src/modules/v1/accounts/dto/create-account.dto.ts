class CreateAccountInputDto {
	name: string;
	locale: string;
	status: number;
}

class CreateAccountOutputDto {
	name: string;
	locale: string;
	status: number;
}

export { CreateAccountInputDto, CreateAccountOutputDto };
