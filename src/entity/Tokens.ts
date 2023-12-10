import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm"
import { Users } from './Users'

@Entity()
export class Tokens {

    @PrimaryColumn()
    user_id!: number
    
    @ManyToOne(() => Users)
    @JoinColumn({name: 'user_id'})
    user!: Users

    @Column({unique: true})
    refresh_token!: string

}
