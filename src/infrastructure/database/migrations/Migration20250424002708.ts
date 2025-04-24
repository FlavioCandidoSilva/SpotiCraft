import { Migration } from '@mikro-orm/migrations';

export class Migration20250424002708 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`songs\` modify \`genres\` json not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`songs\` modify \`genres\` text not null;`);
  }

}
