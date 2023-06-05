import { ListOneCardUseCase } from "./ListOneCardUseCase";
import { Request, Response } from "express";

class ListOneCardController {

    private listOneCardUseCase: ListOneCardUseCase;

    public constructor (listOneCardUseCase: ListOneCardUseCase) {
        this.listOneCardUseCase = listOneCardUseCase;
    }

    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user;
        const cardInfos = await this.listOneCardUseCase.execute(cpf);
        return response.status(200).json({cardInfos});
    }

}

export { ListOneCardController };