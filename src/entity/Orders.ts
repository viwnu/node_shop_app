import { Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn, Column, CreateDateColumn } from "typeorm"
import { Users } from './Users'
import { OrdersDetails } from './OrdersDetails'

@Entity()
export class Orders {

    @PrimaryGeneratedColumn()
    order_id!: number

    @Column()
    user_id!: number
    
    @ManyToOne(() => Users)
    @JoinColumn({name: 'user_id'})
    user!: Users

    @OneToMany(() => OrdersDetails, order_details => order_details.order, {cascade: true})
    order_details!: OrdersDetails[]

    @CreateDateColumn()
    order_date!: Date

}
