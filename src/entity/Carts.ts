import { Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn, Column } from "typeorm"
import { Users } from './Users'
import { CartsDetails } from './CartsDetails'

@Entity()
export class Carts {

    @PrimaryGeneratedColumn()
    cart_id!: number

    @Column({unique: true})
    user_id!: number
    
    @ManyToOne(() => Users)
    @JoinColumn({name: 'user_id'})
    user!: Users

    @OneToMany(() => CartsDetails, cart_detail => cart_detail.cart, {cascade: true})
    cart_details!: CartsDetails

}
