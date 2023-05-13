import { ListEventsUseCase } from "./ListEventsUseCase";
import { Request, Response } from "express";

class ListEventsController {

    private listEventsUseCase: ListEventsUseCase;

    constructor (listEventsUseCase: ListEventsUseCase) {
        this.listEventsUseCase = listEventsUseCase;
    }

    public async handle (request: Request, response: Response){
        const allEvents = await this.listEventsUseCase.execute();
        return response.status(200).json({allEvents});
    }

}

export { ListEventsController };