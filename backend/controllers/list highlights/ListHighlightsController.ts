import { ListHighlightsUseCase } from "./ListHighlightsUseCase";
import { Request, Response } from "express";

/**
 * List highlights controller class
 * @date 6/6/2023 - 10:20:30 PM
 *
 * @class ListHighlightsController
 * @typedef {ListHighlightsController}
 */
class ListHighlightsController {
    
    /**
     * Creates an instance of {@link ListHighlightsController}.
     * @date 6/6/2023 - 10:20:38 PM
     *
     * @private
     * @type {ListHighlightsUseCase}
     */
    private listHighlightsUseCase: ListHighlightsUseCase;
    
    /**
     * Creates an instance of ListHighlightsController.
     * @date 6/6/2023 - 10:20:43 PM
     *
     * @constructor
     * @param {ListHighlightsUseCase} listHighlightsUseCase
     */
    constructor (listHighlightsUseCase: ListHighlightsUseCase) {
        this.listHighlightsUseCase = listHighlightsUseCase;
    }
    
    /**
     * Manipulate method for make a list of highlights
     * @date 6/6/2023 - 10:20:47 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const allHighlights = await this.listHighlightsUseCase.execute();
        return response.status(200).json({allHighlights});
    }

}

export { ListHighlightsController };