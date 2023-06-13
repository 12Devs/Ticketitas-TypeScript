import { CheckoutRepository } from "../../db/CheckoutRepository";
import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";


/**
 * Create checkout use case class
 * @date 6/6/2023 - 5:42:07 PM
 *
 * @class CreateCheckoutUseCase
 * @typedef {CreateCheckoutUseCase}
 */
class CreateCheckoutUseCase {
    
    /**
     * Creat an instance of {@link CreateCheckoutUseCase}
     * @date 6/6/2023 - 5:42:34 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {CheckoutRepository}
     */
    private checkoutRepository: CheckoutRepository;
    private eventRepository: EventRepository;

    
    /**
     * Creates an instance of CreateCheckoutUseCase.
     * @date 6/6/2023 - 5:44:41 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this method as having "public" visibility
     * @param {CheckoutRepository} checkoutRepository
     * @param {EventRepository} eventRepository
     */
    public constructor (checkoutRepository: CheckoutRepository, eventRepository: EventRepository) {
        this.checkoutRepository = checkoutRepository;
        this.eventRepository = eventRepository;
    }

    
    /**
     * Method for makes a checkout
     * @date 6/6/2023 - 5:45:00 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} eventId
     * @param {number} pistaAmount
     * @param {number} stageAmount
     * @param {number} vipAmount
     * @param {number} pistaAmountHalf
     * @param {number} stageAmountHalf
     * @param {number} vipAmountHalf
     * @param {number} freeAmount
     * @param {number} amountSale
     * @returns {checkout}
     */
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