import { UpdateStatusPromoterUseCase } from "./UpdateStatusPromoterUseCase";
import { Request, Response } from "express";

/**
 * Update status promoter controller class
 * @date 6/6/2023 - 10:42:13 PM
 *
 * @class UpdateStatusPromoterController
 * @typedef {UpdateStatusPromoterController}
 */
class UpdateStatusPromoterController {
    
    /**
     * Creates an instance of {@link UpdateStatusPromoterController}.
     * @date 6/6/2023 - 10:42:22 PM
     *
     * @private
     * @type {UpdateStatusPromoterUseCase}
     */
    private updateStatusPromoterUseCase: UpdateStatusPromoterUseCase;
    
    /**
     * Creates an instance of UpdateStatusPromoterController.
     * @date 6/6/2023 - 10:42:26 PM
     *
     * @constructor
     * @public
     * @param {UpdateStatusPromoterUseCase} updateStatusPromoterUseCase
     */
    public constructor (updateStatusPromoterUseCase: UpdateStatusPromoterUseCase) {
        this.updateStatusPromoterUseCase = updateStatusPromoterUseCase;
    }
    
    /**
     * Manipulate method for make a update status promoter
     * @date 6/6/2023 - 10:42:29 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response) {
        const { cpf }: any = request.params;

        await this.updateStatusPromoterUseCase.execute(cpf);
        return response.status(204).send();
    }
}

export { UpdateStatusPromoterController };