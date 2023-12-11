import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Products {

    @PrimaryGeneratedColumn()
    product_id?: number

    @Column()
    product_name!: string

    @Column({type: 'varchar', nullable: true})
    manufacture!: string | null

    @Column({type: 'varchar', nullable: true})
    category!: string | null

    @Column({type: 'real'})
    price!: number

    @Column({type: 'varchar', nullable: true})
    description!: string

}
