import { ListOneCheckoutUseCase } from "./ListOneCheckoutUseCase";
import { Request, Response } from "express";

class ListOneCheckoutController {

    private listOneCheckoutUseCase: ListOneCheckoutUseCase;

    public constructor (listOneCheckoutUseCase: ListOneCheckoutUseCase) {
        this.listOneCheckoutUseCase = listOneCheckoutUseCase;
    }

    public async handle (request: Request, response: Response){
        const { id }: any = request.params;
        const CheckoutInfos = await this.listOneCheckoutUseCase.execute(id);
        return response.status(200).json({CheckoutInfos});
    }

}

export { ListOneCheckoutController };