//Import of the class GenerateAllEventsReportUseCase
import { GenerateAllEventsReportUseCase } from "./GenerateAllEventsReportUseCase";

//Import of the Request and Reponse submodules of the express module
import { Request, Response } from "express";

/**
 * Class for requesting the return of a report regarding all events and their sales
 * @date 6/5/2023 - 5:40:14 PM
 *
 * @class GenerateAllEventsReportController
 * @typedef {GenerateAllEventsReportController}
 */
class GenerateAllEventsReportController {

    private generateAllEventsReportUseCase: GenerateAllEventsReportUseCase;

    /**
     * Creates an instance of GenerateAllEventsReportController.
     * @date 6/5/2023 - 5:40:14 PM
     *
     * @constructor Marks this part of the code as a contructor
     * @param {GenerateAllEventsReportUseCase} generateAllEventsReportUseCase
     */
    constructor (generateAllEventsReportUseCase: GenerateAllEventsReportUseCase) {
        this.generateAllEventsReportUseCase = generateAllEventsReportUseCase;
    }

    /**
     * Method that requests the return of a report regarding all events and their sales
     * @date 6/5/2023 - 5:40:14 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Table of information regarding the request
     */
    public async handle (request: Request, response: Response){
        
        //Requesting the actions of generating and returning an all events report
        const allEventData = await this.generateAllEventsReportUseCase.execute();
        
        return response.status(200).json(allEventData);
    }

}

export { GenerateAllEventsReportController }; //Class export declarator