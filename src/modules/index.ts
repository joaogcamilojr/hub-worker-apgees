import { AccountsModule } from './v1/accounts/accounts.module';
import { EmailsModule } from './v1/emails/emails.module';
import { UsersModule } from './v1/users/users.module';
import { WorkItemCategoriesModule } from './v1/work-item-categories/work-item-categories.module';
import { WorkItemsModule } from './v1/work-items/work-items.module';

export const V1Modules = [
	AccountsModule,
	EmailsModule,
	UsersModule,
	WorkItemCategoriesModule,
	WorkItemsModule,
];
