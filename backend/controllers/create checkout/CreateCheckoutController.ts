import { CreateCheckoutUseCase } from "./CreateCheckoutUseCase";
import { Request, Response } from "express";

class CreateCheckoutController {

    private createCheckoutUseCase: CreateCheckoutUseCase;

    public constructor (createCheckoutUseCase: CreateCheckoutUseCase) {
        this.createCheckoutUseCase = createCheckoutUseCase;
    }

    public async handle (request: Request, response: Response) {

        const { eventId, pistaAmount, stageAmount, vipAmount, pistaAmountHalf, stageAmountHalf, vipAmountHalf, freeAmount, walletValue, amountSale } = request.body;

        const checkout: any = await this.createCheckoutUseCase.execute(eventId, pistaAmount, stageAmount, vipAmount, pistaAmountHalf, stageAmountHalf, vipAmountHalf, freeAmount, walletValue, amountSale);

        return response.status(201).json({checkout});
    }

}

export { CreateCheckoutController }