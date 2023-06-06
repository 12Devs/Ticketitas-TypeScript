import { Request, Response } from "express";
import { UpdateImageEventUseCase } from "./UpdateImageEventUseCase";

class UpdateImageEventController {

    public updateImageEventUseCase: UpdateImageEventUseCase;

    public constructor (updateImageEventUseCase: UpdateImageEventUseCase) {
        this.updateImageEventUseCase = updateImageEventUseCase;
    }
    
    public async handle (request: Request, response: Response) {

        const { id } = request.body;
        const { cpf } = request.user;
        const imageEvent = request.file;
        await this.updateImageEventUseCase.execute(id, cpf, imageEvent);
        return response.status(204).send();
    }

}

export { UpdateImageEventController }