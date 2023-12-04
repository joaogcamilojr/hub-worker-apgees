import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

const mailerSend = new MailerSend({
	apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender('suporte@apgees.com.br', 'Apgees');

const recipients = [new Recipient('joao.camilo@apgees.com.br', 'João camilo')];

@Injectable()
export class EmailsService {
	async send(data: any) {
		const variables = [
			{
				email: 'suporte@apgees.com.br',
				substitutions: [
					{
						var: 'name',
						value: data.name,
					},
					{
						var: 'action_url',
						value: data.action_url,
					},
					{
						var: 'help_url',
						value: data.help_url,
					},
				],
			},
		];

		const emailParams = new EmailParams()
			// .setFrom(sentFrom)
			.setTo(recipients)
			// .setReplyTo(sentFrom)
			.setTemplateId('z3m5jgrn7m0ldpyo')
			.setVariables(variables);

		await mailerSend.email.send(emailParams);

		return 'This action adds a new email';
	}
}
