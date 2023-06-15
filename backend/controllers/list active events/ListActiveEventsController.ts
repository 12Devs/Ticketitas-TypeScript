import { ListActiveEventsUseCase } from "./ListActiveEventsUseCase";
import { Request, Response } from "express";

/**
 * List events controller class
 * @date 6/6/2023 - 10:19:46 PM
 *
 * @class ListActiveEventsController
 * @typedef {ListActiveEventsController}
 */
class ListActiveEventsController {
    
    /**
     * Creates an instance of {@link ListActiveEventsController}.
     * @date 6/6/2023 - 10:19:52 PM
     *
     * @private
     * @type {ListActiveEventsUseCase}
     */
    private listActiveEventsUseCase: ListActiveEventsUseCase;
    
    /**
     * Creates an instance of ListActiveEventsController.
     * @date 6/6/2023 - 10:19:58 PM
     *
     * @constructor
     * @param {ListActiveEventsUseCase} listActiveEventsUseCase
     */
    constructor (listActiveEventsUseCase: ListActiveEventsUseCase) {
        this.listActiveEventsUseCase = listActiveEventsUseCase;
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
        const allActiveEvents = await this.listActiveEventsUseCase.execute();
        return response.status(200).json({allActiveEvents});
    }

}

export { ListActiveEventsController };