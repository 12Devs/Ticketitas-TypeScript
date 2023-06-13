import { ListOneCheckoutUseCase } from "./ListOneCheckoutUseCase";
import { Request, Response } from "express";

/**
 * List one checkout controller class
 * @date 6/6/2023 - 10:23:54 PM
 *
 * @class ListOneCheckoutController
 * @typedef {ListOneCheckoutController}
 */
class ListOneCheckoutController {
    
    /**
     * Creates an instance of {@link ListOneCheckoutController}.
     * @date 6/6/2023 - 10:23:59 PM
     *
     * @private
     * @type {ListOneCheckoutUseCase}
     */
    private listOneCheckoutUseCase: ListOneCheckoutUseCase;
    
    /**
     * Creates an instance of ListOneCheckoutController.
     * @date 6/6/2023 - 10:24:04 PM
     *
     * @constructor
     * @public
     * @param {ListOneCheckoutUseCase} listOneCheckoutUseCase
     */
    public constructor (listOneCheckoutUseCase: ListOneCheckoutUseCase) {
        this.listOneCheckoutUseCase = listOneCheckoutUseCase;
    }
    
    /**
     * Manipulate method for make a list of one checkout
     * @date 6/6/2023 - 10:24:08 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const { id }: any = request.params;
        const CheckoutInfos = await this.listOneCheckoutUseCase.execute(id);
        return response.status(200).json({CheckoutInfos});
    }

}

export { ListOneCheckoutController };