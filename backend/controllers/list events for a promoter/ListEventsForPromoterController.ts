import { Request, Response } from "express";
import { ListEventsForPromoterUseCase } from "./ListEventsForPromoterUseCase";

/**
 * List events For a promoter controller class
 * @date 6/6/2023 - 10:30:58 PM
 *
 * @class ListEventsForPromoter
 * @typedef {ListEventsForPromoter}
 */
class ListEventsForPromoterController {
    
    /**
     * Creates an instance of {@link ListEventsForPromoterController}.
     * @date 6/6/2023 - 10:31:07 PM
     *
     * @private
     * @type {ListEventsForPromoterUseCase}
     */
    private listEventsForPromoterUseCase: ListEventsForPromoterUseCase;
    
    /**
     * Creates an instance of ListEventsForPromoter.
     * @date 6/6/2023 - 10:31:11 PM
     *
     * @constructor
     * @public
     * @param {ListEventsForPromoterUseCase} listEventsForPromoterUseCase
     */
    public constructor (listEventsForPromoterUseCase: ListEventsForPromoterUseCase) {
        this.listEventsForPromoterUseCase = listEventsForPromoterUseCase;
    }
    
    /**
     * Manipulate method For make a list of events For a promoter
     * @date 6/6/2023 - 10:31:16 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user;
        const PromoterInfos = await this.listEventsForPromoterUseCase.execute(cpf);
        return response.status(200).json({PromoterInfos});
    }

}

export { ListEventsForPromoterController };