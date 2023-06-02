import { Request, Response } from "express";
import { ListTicketsForClientUseCase } from "./ListTicketsForClientUseCase";

class ListTicketsForClientController {

    private listTicketsForClientUseCase: ListTicketsForClientUseCase;

    public constructor (listTicketsForClientUseCase: ListTicketsForClientUseCase) {
        this.listTicketsForClientUseCase = listTicketsForClientUseCase;
    }

    public async handle (request: Request, response: Response){
        const { clientCpf }: any = request.params;
        const PromoterInfos = await this.listTicketsForClientUseCase.execute(clientCpf);
        return response.status(200).json({PromoterInfos});
    }

}

export { ListTicketsForClientController };