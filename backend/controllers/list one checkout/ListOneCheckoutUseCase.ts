import { CheckoutRepository } from "../../db/CheckoutRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * List one checkout use case class
 * @date 6/6/2023 - 10:24:16 PM
 *
 * @class ListOneCheckoutUseCase
 * @typedef {ListOneCheckoutUseCase}
 */
class ListOneCheckoutUseCase {
    
    /**
     * Creates an instance of {@link ListOneCheckoutUseCase}.
     * @date 6/6/2023 - 10:24:27 PM
     *
     * @private
     * @type {CheckoutRepository}
     */
    private checkoutRepository: CheckoutRepository;
    
    /**
     * Creates an instance of ListOneCheckoutUseCase.
     * @date 6/6/2023 - 10:24:32 PM
     *
     * @constructor
     * @param {CheckoutRepository} checkoutRepository
     */
    constructor (checkoutRepository: CheckoutRepository) {
        this.checkoutRepository = checkoutRepository;
    }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:24:36 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {unknown}
     */
    public async execute (id: string){
        const checkout: any = await this.checkoutRepository.findOneCheckout(id);
        
        if(!checkout) {
            throw new ApiError("Checkout não encontrado", 400);
        }

        
        return { checkout };
    }

}

export { ListOneCheckoutUseCase };