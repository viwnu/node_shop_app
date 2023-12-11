import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm"
import { Products } from './Products'
import { Orders } from './Orders'

@Entity()
export class OrdersDetails {

    @PrimaryGeneratedColumn()
    order_details_id!: number

    @Column()
    order_id!: number

    @ManyToOne(() => Orders)
    @JoinColumn({name: 'order_id'})
    order!: Orders

    @Column()
    product_id!: number

    @ManyToOne(() => Products)
    @JoinColumn({name: 'product_id'})
    product!: Products

    @Column({type: 'real'})
    quantity!: number


}
