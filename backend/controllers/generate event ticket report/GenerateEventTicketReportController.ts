//Import of the class GenerateEventTicketReportUseCase
import { GenerateEventTicketReportUseCase } from "./GenerateEventTicketReportUseCase";

//Import of the Request and Reponse submodules of the express module
import { Request, Response } from "express";

/**
 * Class for requesting the return of a report regarding the ticket sales of a specific event
 * @date 6/4/2023 - 4:11:32 PM
 *
 * @class GenerateEventTicketReportController
 * @typedef {GenerateEventTicketReportController}
 */
class GenerateEventTicketReportController {

    private generateEventTicketReportUseCase: GenerateEventTicketReportUseCase;

    /**
     * Creates an instance of GenerateEventTicketReportController.
     * @date 6/4/2023 - 4:11:32 PM
     *
     * @constructor Marks this part of the code as a contructor
     * @public Marks this constructor as having "public" visibility
     * @param {GenerateEventTicketReportUseCase} generateEventTicketReportUseCase
     */
    public constructor (generateEventTicketReportUseCase: GenerateEventTicketReportUseCase) {
        this.generateEventTicketReportUseCase = generateEventTicketReportUseCase;
    }

    /**
     * Method that requests the return of a report regarding the ticket sales of a specific event
     * @date 6/4/2023 - 4:11:32 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Table of information regarding the request
     */
    public async handle (request: Request, response: Response){
        const { cpf, tipo } = request.user; //Obtaining token info
        const { id }:any = request.params; //Obtaning the desired id for the event ticket report
        
        //Requesting the actions of generating and returning a ticket sales report
        const eventTicketInfo = await this.generateEventTicketReportUseCase.execute(id, cpf, tipo);
        
        return response.status(200).json(eventTicketInfo);
    }

}

export { GenerateEventTicketReportController }; //Class export declarator