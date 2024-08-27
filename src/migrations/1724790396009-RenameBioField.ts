import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameBioField1724790396009 implements MigrationInterface {
  name = 'RenameBioField1724790396009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "boi" TO "bio"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "bio" TO "boi"`);
  }
}
