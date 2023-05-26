import { UpdateStatusEventUseCase } from "./UpdateStatusEventUseCase";
import { Request, Response } from "express";

class UpdateStatusEventController {

    private updateStatusEventUseCase: UpdateStatusEventUseCase;

    public constructor (updateStatusEventUseCase: UpdateStatusEventUseCase) {
        this.updateStatusEventUseCase = updateStatusEventUseCase;
    }

    public async handle (request: Request, response: Response) {

        const { id, promoterCpf } = request.body;

        await this.updateStatusEventUseCase.execute(id, promoterCpf);
        
        return response.status(204).send();
    }
}

export { UpdateStatusEventController };