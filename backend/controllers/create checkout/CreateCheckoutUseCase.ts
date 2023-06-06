import { CheckoutRepository } from "../../db/CheckoutRepository";
import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";


class CreateCheckoutUseCase {

    private checkoutRepository: CheckoutRepository;
    private eventRepository: EventRepository;

    public constructor (checkoutRepository: CheckoutRepository, eventRepository: EventRepository) {
        this.checkoutRepository = checkoutRepository;
        this.eventRepository = eventRepository;
    }

    public async execute (eventId: string, pistaAmount: number, stageAmount: number, vipAmount: number, pistaAmountHalf: number, stageAmountHalf: number, vipAmountHalf: number, freeAmount: number, amountSale: number) {

        if (!eventId) {
            throw new ApiError("O id do evento é obrigatório!", 422);
        }

        if (!pistaAmount === null || pistaAmount === undefined) {
            throw new ApiError("A quantidade de ingressos no setor pista é obrigatória!", 422);
        }

        if (!stageAmount === null || stageAmount === undefined) {
            throw new ApiError("A quantidade de ingressos no setor stage é obrigatória!", 422);
        }

        if (!vipAmount === null || vipAmount === undefined) {
            throw new ApiError("A quantidade de ingressos no setor vip é obrigatória!", 422);
        }

        if (!pistaAmountHalf === null || pistaAmountHalf === undefined) {
            throw new ApiError("A quantidade de ingressos meia-entrada no setor pista é obrigatória!", 422);
        }

        if (!stageAmountHalf === null || stageAmountHalf === undefined) {
            throw new ApiError("A quantidade de ingressos meia-entrada no setor stage é obrigatória!", 422);
        }

        if (!vipAmountHalf === null || vipAmountHalf === undefined) {
            throw new ApiError("A quantidade de ingressos meia-entrada no setor vip é obrigatória!", 422);
        }

        if (!freeAmount === null || freeAmount === undefined) {
            throw new ApiError("A quantidade de ingressos grátis é obrigatória!", 422);
        }

        if (!amountSale === null || amountSale === undefined) {
            throw new ApiError("O valor total da compra é obrigatório!", 422);
        }

        const eventExists = await this.eventRepository.findOneEvent(eventId);

        if (!eventExists) {
            throw new ApiError("Evento não encontrado!", 422);
        }

        const checkout = await this.checkoutRepository.create(eventId, pistaAmount, stageAmount, vipAmount, pistaAmountHalf, stageAmountHalf, vipAmountHalf, freeAmount, amountSale);

        return checkout;
    }
}

export { CreateCheckoutUseCase }