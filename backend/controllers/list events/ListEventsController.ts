import { ListEventsUseCase } from "./ListEventsUseCase";
import { Request, Response } from "express";

/**
 * List events controller class
 * @date 6/6/2023 - 10:19:46 PM
 *
 * @class ListEventsController
 * @typedef {ListEventsController}
 */
class ListEventsController {
    
    /**
     * Creates an instance of {@link ListEventsController}.
     * @date 6/6/2023 - 10:19:52 PM
     *
     * @private
     * @type {ListEventsUseCase}
     */
    private listEventsUseCase: ListEventsUseCase;
    
    /**
     * Creates an instance of ListEventsController.
     * @date 6/6/2023 - 10:19:58 PM
     *
     * @constructor
     * @param {ListEventsUseCase} listEventsUseCase
     */
    constructor (listEventsUseCase: ListEventsUseCase) {
        this.listEventsUseCase = listEventsUseCase;
    }
    
    /**
     * Manipulate method for make a list of events
     * @date 6/6/2023 - 10:20:02 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const allEvents = await this.listEventsUseCase.execute();
        return response.status(200).json({allEvents});
    }

}

export { ListEventsController };