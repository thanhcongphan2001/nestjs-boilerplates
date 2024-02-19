import { MigrationInterface, QueryRunner } from "typeorm";

export class Addhehe1708076842669 implements MigrationInterface {
    name = 'Addhehe1708076842669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hehe" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ca456ea0754ab2f575b01fbb237" UNIQUE ("email"), CONSTRAINT "PK_55e7e37a2879a3e05f17f4cb16a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hehe"`);
    }

}
