import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1719872428581 implements MigrationInterface {
    name = 'CreateUsers1719872428581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'accountID', \`name\` varchar(255) NOT NULL COMMENT 'accountName', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
