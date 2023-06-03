import { Checkout } from "../models/Checkout";


class CheckoutRepository {

    public async create (eventId: string, pistaAmount: number, stageAmount: number, vipAmount: number, pistaAmountHalf: number, stageAmountHalf: number, vipAmountHalf: number, freeAmount: number, amountSale: number) {
        
        const checkout = await Checkout.create({pistaAmount, stageAmount, vipAmount, pistaAmountHalf, stageAmountHalf, vipAmountHalf, freeAmount, amountSale, eventId});

        return checkout;
    }

    public async findOneCheckout(id: string) {

        const checkout = await Checkout.findOne({raw: true,
            where: {
                id: id
        }});
        return checkout;
    }
}

export { CheckoutRepository }