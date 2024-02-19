import { MigrationInterface, QueryRunner } from "typeorm";

export class Addemailhehe1708305198336 implements MigrationInterface {
    name = 'Addemailhehe1708305198336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hehe" ADD "emailE" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hehe" ADD CONSTRAINT "UQ_c81c020ba5661ff8f8016d740d4" UNIQUE ("emailE")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hehe" DROP CONSTRAINT "UQ_c81c020ba5661ff8f8016d740d4"`);
        await queryRunner.query(`ALTER TABLE "hehe" DROP COLUMN "emailE"`);
    }

}
