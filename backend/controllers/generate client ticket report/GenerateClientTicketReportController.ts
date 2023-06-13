//Import of the Request and Reponse submodules of the express module
import { Request, Response } from "express";

//Import of the class GenerateClientTicketReportUseCase
import { GenerateClientTicketReportUseCase } from "./GenerateClientTicketReportUseCase";

/**
 * Class for requesting the return of a report regarding the ticket sales for a specific client
 * @date 6/5/2023 - 11:31:05 AM
 *
 * @class GenerateClientTicketReportController
 * @typedef {GenerateClientTicketReportController}
 */
class GenerateClientTicketReportController {

    private generateClientTicketReportUseCase: GenerateClientTicketReportUseCase;

    /**
     * Creates an instance of GenerateClientTicketReportController.
     * @date 6/5/2023 - 11:31:05 AM
     *
     * @constructor Marks this part of the code as a contructor
     * @public Marks this constructor as having "public" visibility
     * @param {GenerateClientTicketReportUseCase} generateClientTicketReportUseCase
     */
    public constructor (generateClientTicketReportUseCase: GenerateClientTicketReportUseCase) {
        this.generateClientTicketReportUseCase = generateClientTicketReportUseCase;
    }

    /**
     * Class for requesting the return of a report regarding the ticket sales for a specific client
     * @date 6/5/2023 - 11:31:05 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {Request} request Request object
     * @param {Response} response Response object
     * @returns {string} Table of information regarding the request
     */
    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user; //Obtaining token info
        
        //Requesting the actions of generating and returning a client ticket sales report
        const clientTicketInfo = await this.generateClientTicketReportUseCase.execute(cpf);
        return response.status(200).json(clientTicketInfo);
    }

}

export { GenerateClientTicketReportController }; //Class export declarator