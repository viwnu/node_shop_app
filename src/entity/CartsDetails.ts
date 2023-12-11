import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm"
import { Carts } from './Carts'
import { Products } from './Products'

@Entity()
export class CartsDetails {

    @PrimaryGeneratedColumn()
    cart_details_id!: number

    @Column()
    cart_id!: number

    @ManyToOne(() => Carts)
    @JoinColumn({name: 'cart_id'})
    cart!: Carts

    @Column()
    product_id!: number

    @ManyToOne(() => Products)
    @JoinColumn({name: 'product_id'})
    product!: Products

    @Column({type: 'real'})
    quantity!: number


}
