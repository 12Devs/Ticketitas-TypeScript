
import { Request, Response } from "express";
import { SetFeaturedEventUseCase } from "./SetFeaturedEventUseCase";

/**
 * Set featured event controller class
 * @date 6/6/2023 - 10:39:32 PM
 *
 * @class SetFeaturedEventController
 * @typedef {SetFeaturedEventController}
 */
class SetFeaturedEventController {
    
    /**
     * Creates an instance of {@link SetFeaturedEventController}.
     * @date 6/6/2023 - 10:39:37 PM
     *
     * @private
     * @type {SetFeaturedEventUseCase}
     */
    private setFeaturedEventUseCase: SetFeaturedEventUseCase;
    
    /**
     * Creates an instance of SetFeaturedEventController.
     * @date 6/6/2023 - 10:39:41 PM
     *
     * @constructor
     * @public
     * @param {SetFeaturedEventUseCase} setFeaturedEventUseCase
     */
    public constructor (setFeaturedEventUseCase: SetFeaturedEventUseCase) {
        this.setFeaturedEventUseCase = setFeaturedEventUseCase;
    }
    
    /**
     * Manipulate method for make a set featured event
     * @date 6/6/2023 - 10:39:45 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response) {
        const { id }: any = request.params;
        await this.setFeaturedEventUseCase.execute(id);
        return response.status(201).json({message: "Evento atualizado como destaque com sucesso!"});
    }
}

export { SetFeaturedEventController };