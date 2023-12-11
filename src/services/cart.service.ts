import { AppDataSource } from '../data-source'
import { Carts } from '../entity/Carts'
import { CartsDetails } from '../entity/CartsDetails'
import { ApiError } from '../exceptions/api.error'

class CartService {
    async create(incomingValues: Carts) {
        const savedCart = await AppDataSource.manager.save(Carts, incomingValues)
        return savedCart
    }

    async get(user_id: number) {
        const findedCart = await AppDataSource.manager.findOneBy(Carts, {user_id})
        const findedCartDetails = await AppDataSource.manager.findBy(CartsDetails, {cart_id: findedCart!.cart_id})
        return {...findedCart, cart_details: findedCartDetails}
    }

    async update(user_id: number, incomingValues: CartsDetails[]) {
        const candidate = await AppDataSource.manager.findOneBy(Carts, {user_id})
        if (candidate !== null) {
            await AppDataSource.manager.delete(CartsDetails, { cart_id: candidate.cart_id })
            const newCartDetails = incomingValues.map((details) => ({
                ...details,
                cart_id: candidate.cart_id
            }))
            const updatedCart = await AppDataSource.manager.save(CartsDetails, newCartDetails)
            return updatedCart
        }
    }

    async delete(user_id: number) {
        const candidate = await AppDataSource.manager.findOneBy(Carts, {user_id})
        if (candidate !== null) {
            const candidateDetails = await AppDataSource.manager.findBy(CartsDetails, {cart_id: candidate!.cart_id})
            await AppDataSource.manager.delete(CartsDetails, { cart_id: candidate.cart_id })
            await AppDataSource.manager.delete(Carts, {user_id})
            return {...candidate, cart_details: candidateDetails}
        }
        throw ApiError.BadRequest('nothing to be deleted')
    }
}

export default new CartService()