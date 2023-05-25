import { EditEventUseCase } from "./EditEventUseCase";
import { Request, Response } from "express";

class EditEventController {

    private editEventUseCase: EditEventUseCase;

    constructor (editEventUseCase: EditEventUseCase) {
        this.editEventUseCase = editEventUseCase;
    }
    

    //Alterando dados do evento
    public async handle (request: Request, response: Response, id: string){
        const allEvents = await this.editEventUseCase.execute(id);

        
        
        return response.status(200).json({allEvents});
    }



    
}

export {EditEventController}