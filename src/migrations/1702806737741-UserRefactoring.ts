import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRefactoring1702806737741 implements MigrationInterface {
    name = 'UserRefactoring1702806737741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE "public"."users_user_role_enum"
            RENAME TO "users_user_role_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."users_user_role_enum" AS ENUM('ADMIN', 'USER', 'CUSTOMER')
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "user_role" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "user_role" TYPE "public"."users_user_role_enum" USING "user_role"::"text"::"public"."users_user_role_enum"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "user_role"
            SET DEFAULT 'CUSTOMER'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_user_role_enum_old"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_user_role_enum_old" AS ENUM('ADMIN', 'USER')
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "user_role" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "user_role" TYPE "public"."users_user_role_enum_old" USING "user_role"::"text"::"public"."users_user_role_enum_old"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "user_role"
            SET DEFAULT 'USER'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_user_role_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."users_user_role_enum_old"
            RENAME TO "users_user_role_enum"
        `);
    }

}
