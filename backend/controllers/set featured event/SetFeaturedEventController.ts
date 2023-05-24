
import { Request, Response } from "express";
import { SetFeaturedEventUseCase } from "./SetFeaturedEventUseCase";

class SetFeaturedEventController {

    private setFeaturedEventUseCase: SetFeaturedEventUseCase;

    public constructor (setFeaturedEventUseCase: SetFeaturedEventUseCase) {
        this.setFeaturedEventUseCase = setFeaturedEventUseCase;
    }

    public async handle (request: Request, response: Response) {
        const { id }: any = request.params;
        await this.setFeaturedEventUseCase.execute(id);
        return response.status(201).json({message: "Evento atualizado como destaque com sucesso!"});
    }
}

export { SetFeaturedEventController };