import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRefactoring1702807181233 implements MigrationInterface {
    name = 'UserRefactoring1702807181233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            update users
            set user_role='CUSTOMER'
            where user_role='USER';
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."users_user_role_enum"
            RENAME TO "users_user_role_enum_old"
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."users_user_role_enum" AS ENUM('ADMIN', 'CUSTOMER')
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
            CREATE TYPE "public"."users_user_role_enum_old" AS ENUM('ADMIN', 'USER', 'CUSTOMER')
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
            SET DEFAULT 'CUSTOMER'
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_user_role_enum"
        `);
        await queryRunner.query(`
            ALTER TYPE "public"."users_user_role_enum_old"
            RENAME TO "users_user_role_enum"
        `);
        await queryRunner.query(`
            update users
            set user_role='USER'
            where user_role='CUSTOMER';
        `);
    }

}
