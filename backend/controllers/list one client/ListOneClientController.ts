import { ListOneClientUseCase } from "./ListOneClientUseCase";
import { Request, Response } from "express";

class ListOneClientController {

    private listOneClientUseCase: ListOneClientUseCase;

    public constructor (listOneClientUseCase: ListOneClientUseCase) {
        this.listOneClientUseCase = listOneClientUseCase;
    }

    public async handle (request: Request, response: Response){
        const { cpf }: any = request.params;
        const ClientInfos = await this.listOneClientUseCase.execute(cpf);
        return response.status(200).json({ClientInfos});
    }

}

export { ListOneClientController };