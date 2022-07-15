import { Migration } from '@mikro-orm/migrations';

export class Migration20220613040817 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "notification" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "content" varchar(255) not null, "status" varchar(255) not null, "user_id" int not null);');

    this.addSql('alter table "notification" add constraint "notification_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "notification" cascade;');
  }

}
