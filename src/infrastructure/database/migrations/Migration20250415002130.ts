import { Migration } from '@mikro-orm/migrations';

export class Migration20250415002130 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`songs\` (\`id\` int unsigned not null auto_increment primary key, \`title\` varchar(255) not null, \`duration\` int not null, \`genres\` text not null, \`url\` varchar(255) not null, \`explicit\` tinyint(1) not null, \`release_date\` datetime not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`deleted_at\` datetime null) default character set utf8mb4 engine = InnoDB;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`songs\`;`);
  }

}
