import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    user_id?: number

    @Column({type: 'varchar', nullable: true})
    firstName!: string | null

    @Column({type: 'varchar', nullable: true})
    surName!: string | null

    @Column({type: 'varchar', nullable: true})
    lastName!: string | null

    @Column({
        unique: true
    })
    email!: string

    @Column()
    password!: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    user_role?: UserRole

}
