import { ListOneEventUseCase } from "./ListOneEventUseCase";
import { Request, Response } from "express";

/**
 * List one event controller class
 * @date 6/6/2023 - 10:26:09 PM
 *
 * @class ListOneEventController
 * @typedef {ListOneEventController}
 */
class ListOneEventController {
    
    /**
     * Creates an instance of {@link ListOneEventController}.
     * @date 6/6/2023 - 10:26:15 PM
     *
     * @private
     * @type {ListOneEventUseCase}
     */
    private listOneEventUseCase: ListOneEventUseCase;
    
    /**
     * Creates an instance of ListOneEventController.
     * @date 6/6/2023 - 10:26:20 PM
     *
     * @constructor
     * @public
     * @param {ListOneEventUseCase} listOneEventUseCase
     */
    public constructor (listOneEventUseCase: ListOneEventUseCase) {
        this.listOneEventUseCase = listOneEventUseCase;
    }
    
    /**
     * Manipulate method for make a list of one event
     * @date 6/6/2023 - 10:26:23 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle (request: Request, response: Response){
        const { id }: any = request.params;
        const eventInfos = await this.listOneEventUseCase.execute(id);
        return response.status(200).json({eventInfos});
    }

}

export { ListOneEventController };