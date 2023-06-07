

import { Checkout } from "../models/Checkout";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 10:49:56 PM
 *
 * @class CheckoutRepository
 * @typedef {CheckoutRepository}
 */
class CheckoutRepository {
    
    /**
     * Creates an instance of {@link CheckoutRepository}.
     * @date 6/6/2023 - 10:50:00 PM
     *
     * @public
     * @async
     * @param {string} eventId
     * @param {number} pistaAmount
     * @param {number} stageAmount
     * @param {number} vipAmount
     * @param {number} pistaAmountHalf
     * @param {number} stageAmountHalf
     * @param {number} vipAmountHalf
     * @param {number} freeAmount
     * @param {number} amountSale
     * @returns {unknown}
     */
    public async create (eventId: string, pistaAmount: number, stageAmount: number, vipAmount: number, pistaAmountHalf: number, stageAmountHalf: number, vipAmountHalf: number, freeAmount: number, amountSale: number) {
        
        const checkout = await Checkout.create({pistaAmount, stageAmount, vipAmount, pistaAmountHalf, stageAmountHalf, vipAmountHalf, freeAmount, amountSale, eventId});

        return checkout;
    }
    
    /**
     * Fing one checkout
     * @date 6/6/2023 - 10:50:09 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {unknown}
     */
    public async findOneCheckout(id: string) {

        const checkout = await Checkout.findOne({raw: true,
            where: {
                id: id
        }});
        return checkout;
    }
    
    /**
     * Delete one checkout
     * @date 6/6/2023 - 10:50:14 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {*}
     */
    public async deleteById (id: string) {
        await Checkout.destroy({
            where: {id: id}
        })
    }
}

export { CheckoutRepository }