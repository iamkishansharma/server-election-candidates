import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1758097783685 implements MigrationInterface {
    name = 'Migration1758097783685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "political_parties" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "abbreviation" character varying(50) NOT NULL, "founded_date" date NOT NULL, "dissolved_date" date, "ideology" character varying(255) NOT NULL, "hq_location" character varying(255) NOT NULL, "website" character varying(255), "logo_url" character varying(255), CONSTRAINT "PK_03a2326822f43f46731b39d3bdf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'whistle_blower', 'fact_checker', 'general_user')`);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "username" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'general_user', "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "political_parties"`);
    }

}
