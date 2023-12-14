import { AppDataSource } from '../data-source'
import { Orders } from '../entity/Orders'
import { OrdersDetails } from '../entity/OrdersDetails'
import cartService from './cart.service'

class OrderService {
    async create(user_id: number) {
        const deletedCart = await cartService.delete(user_id)
        const newOrder = {
            user_id: deletedCart.user_id,
            order_details: deletedCart.cart_details.map((details) => ({
                product_id: details.product_id,
                quantity: details.quantity
            }))
        }

        const order = await AppDataSource.manager.save(Orders, newOrder)
        return order
    }

    async getBy(column_name: string, column_value: number) {
        const findedOrders = await AppDataSource.manager.findBy(Orders, {[column_name]: column_value})
        const findedOrdersWithDetails = await Promise.all(findedOrders.map(async (order) => ({
            ...order,
            order_details: await AppDataSource.manager.findBy(OrdersDetails, {order_id: order.order_id})
        })))
        return findedOrdersWithDetails
    }

    async get() {
        const findedOrders = await AppDataSource.manager.find(Orders)
        const findedOrdersWithDetails = await Promise.all(findedOrders.map(async (order) => ({
            ...order,
            order_details: await AppDataSource.manager.findBy(OrdersDetails, {order_id: order.order_id})
        })))
        return findedOrdersWithDetails
    }

    async update(order_id: number, incomingValues: OrdersDetails[]) {
        const candidate = await AppDataSource.manager.findOneBy(Orders, {order_id})
        if (candidate !== null) {
            await AppDataSource.manager.delete(OrdersDetails, { order_id })
            const newOrderDetails = incomingValues.map((details) => ({
                ...details,
                order_id: candidate.order_id
            }))
            const updatedCart = await AppDataSource.manager.save(OrdersDetails, newOrderDetails)
            return updatedCart
        }
    }

    async delete(order_id: number) {
        const candidate = await AppDataSource.manager.findOneBy(Orders, {order_id})
        if (candidate !== null) {
            const candidateDetails = await AppDataSource.manager.findBy(OrdersDetails, {order_id: candidate!.order_id})
            await AppDataSource.manager.delete(OrdersDetails, { order_id: candidate.order_id })
            await AppDataSource.manager.delete(Orders, {order_id})
            return {...candidate, order_details: candidateDetails}
        }
    }
}

export default new OrderService()