import { Request, Response } from "express";
import { ListTicketsForClientUseCase } from "./ListTicketsForClientUseCase";

class ListTicketsForClientController {

    private listTicketsForClientUseCase: ListTicketsForClientUseCase;

    public constructor (listTicketsForClientUseCase: ListTicketsForClientUseCase) {
        this.listTicketsForClientUseCase = listTicketsForClientUseCase;
    }

    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user;
        const PromoterInfos = await this.listTicketsForClientUseCase.execute(cpf);
        return response.status(200).json({PromoterInfos});
    }

}

export { ListTicketsForClientController };