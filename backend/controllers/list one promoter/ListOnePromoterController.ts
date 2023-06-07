import { ListOnePromoterUseCase } from "./ListOnePromoterUseCase";
import { Request, Response } from "express";

/**
 * List one promoter controller class
 * @date 6/6/2023 - 10:27:14 PM
 *
 * @class ListOnePromoterController
 * @typedef {ListOnePromoterController}
 */
class ListOnePromoterController {
    
    /**
     * Description placeholder
     * @date 6/6/2023 - 10:27:18 PM
     *
     * @private
     * @type {ListOnePromoterUseCase}
     */
    private listOnePromoterUseCase: ListOnePromoterUseCase;
    
    /**
     * Creates an instance of ListOnePromoterController.
     * @date 6/6/2023 - 10:27:22 PM
     *
     * @constructor
     * @public
     * @param {ListOnePromoterUseCase} listOnePromoterUseCase
     */
    public constructor (listOnePromoterUseCase: ListOnePromoterUseCase) {
        this.listOnePromoterUseCase = listOnePromoterUseCase;
    }
    
    /**
     * Manipulate method for make a list of one promoter
     * @date 6/6/2023 - 10:27:40 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user;
        const PromoterInfos = await this.listOnePromoterUseCase.execute(cpf);
        return response.status(200).json({PromoterInfos});
    }

}

export { ListOnePromoterController };