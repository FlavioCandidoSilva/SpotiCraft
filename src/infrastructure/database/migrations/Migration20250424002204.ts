import { Migration } from '@mikro-orm/migrations';

export class Migration20250424002204 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`songs\` add \`album_id\` int not null, add \`artists_id\` int not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`songs\` drop column \`album_id\`, drop column \`artists_id\`;`);
  }

}
