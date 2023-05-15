import { ListOneEventUseCase } from "./ListOneEventUseCase";
import { Request, Response } from "express";

class ListOneEventController {

    private listOneEventUseCase: ListOneEventUseCase;

    constructor (listOneEventUseCase: ListOneEventUseCase) {
        this.listOneEventUseCase = listOneEventUseCase;
    }

    public async handle (request: Request, response: Response){
        const { id }: any = request.params;
        const event = await this.listOneEventUseCase.execute(id);
        return response.status(200).json({event});
    }

}

export { ListOneEventController };