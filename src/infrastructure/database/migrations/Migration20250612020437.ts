import { Migration } from '@mikro-orm/migrations';

export class Migration20250612020437 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`albums\` (\`id\` int unsigned not null auto_increment primary key, \`title\` varchar(255) not null, \`release_date\` datetime not null, \`artist_id\` int not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`deleted_at\` datetime null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`artists\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`genre\` varchar(255) not null, \`biography\` varchar(255) null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`deleted_at\` datetime null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`playlists\` (\`id\` int unsigned not null auto_increment primary key, \`name\` varchar(255) not null, \`user_id\` int not null, \`song_ids\` json not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`deleted_at\` datetime null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`create table \`songs\` (\`id\` int unsigned not null auto_increment primary key, \`title\` varchar(255) not null, \`duration\` int not null, \`album_id_id\` int unsigned not null, \`artist_id_id\` int unsigned not null, \`genres\` json not null, \`url\` varchar(255) not null, \`explicit\` tinyint(1) not null, \`release_date\` datetime not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`deleted_at\` datetime null) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`songs\` add index \`songs_album_id_id_index\`(\`album_id_id\`);`);
    this.addSql(`alter table \`songs\` add index \`songs_artist_id_id_index\`(\`artist_id_id\`);`);

    this.addSql(`create table \`users\` (\`id\` int unsigned not null auto_increment primary key, \`username\` varchar(255) not null, \`email\` varchar(255) not null, \`password\` varchar(255) not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`deleted_at\` datetime null) default character set utf8mb4 engine = InnoDB;`);

    this.addSql(`alter table \`songs\` add constraint \`songs_album_id_id_foreign\` foreign key (\`album_id_id\`) references \`albums\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`songs\` add constraint \`songs_artist_id_id_foreign\` foreign key (\`artist_id_id\`) references \`artists\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table \`songs\` drop foreign key \`songs_album_id_id_foreign\`;`);

    this.addSql(`alter table \`songs\` drop foreign key \`songs_artist_id_id_foreign\`;`);

    this.addSql(`drop table if exists \`albums\`;`);

    this.addSql(`drop table if exists \`artists\`;`);

    this.addSql(`drop table if exists \`playlists\`;`);

    this.addSql(`drop table if exists \`songs\`;`);

    this.addSql(`drop table if exists \`users\`;`);
  }

}
