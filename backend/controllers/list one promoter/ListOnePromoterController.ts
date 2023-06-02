import { ListOnePromoterUseCase } from "./ListOnePromoterUseCase";
import { Request, Response } from "express";

class ListOnePromoterController {

    private listOnePromoterUseCase: ListOnePromoterUseCase;

    public constructor (listOnePromoterUseCase: ListOnePromoterUseCase) {
        this.listOnePromoterUseCase = listOnePromoterUseCase;
    }

    public async handle (request: Request, response: Response){
        const { cpf }: any = request.params;
        const PromoterInfos = await this.listOnePromoterUseCase.execute(cpf);
        return response.status(200).json({PromoterInfos});
    }

}

export { ListOnePromoterController };