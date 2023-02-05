import {MigrationInterface, QueryRunner} from "typeorm";

export class primerMigracion1674000102465 implements MigrationInterface {
    name = 'primerMigracion1674000102465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`crudnestjs\`.\`producto\` CHANGE \`descripcion\` \`descripcion\` text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`crudnestjs\`.\`producto\` CHANGE \`descripcion\` \`descripcion\` text NOT NULL`);
    }

}
