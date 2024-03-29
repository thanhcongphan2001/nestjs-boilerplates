import { MigrationInterface, QueryRunner } from "typeorm";

export class DataSource1708596872832 implements MigrationInterface {
    name = 'DataSource1708596872832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "my_user" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying NOT NULL, "refresh_token" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6365f7c059ec3be556eebefeb71" UNIQUE ("email"), CONSTRAINT "PK_700e00b4159e2f23f5101827428" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "my_user"`);
    }

}
