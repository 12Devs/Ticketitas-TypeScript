import { EventRepository } from "../../db/EventRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { WalletRepository } from "../../db/WalletRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * Update status event use case class
 * @date 6/6/2023 - 10:41:49 PM
 *
 * @class UpdateStatusEventUseCase
 * @typedef {UpdateStatusEventUseCase}
 */
class UpdateStatusEventUseCase {
    
    /**
     * Create an instance of {@link UpdateStatusEventUseCase}
     * @date 6/6/2023 - 10:41:53 PM
     *
     * @private
     * @type {EventRepository}
     */
    private eventRepository: EventRepository;
    private ticketRepository: TicketRepository;
    private walletRepository: WalletRepository;
    
    /**
     * Creates an instance of UpdateStatusEventUseCase.
     * @date 6/6/2023 - 10:41:57 PM
     *
     * @constructor
     * @public
     * @param {EventRepository} eventRepository
     * @param {TicketRepository} ticketRepository
     * @param {WalletRepository} walletRepository
     */
    public constructor (eventRepository: EventRepository, ticketRepository: TicketRepository, walletRepository: WalletRepository) {
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
        this.walletRepository = walletRepository;
    }
    
    /**
     * Method for make a update of a event
     * @date 6/6/2023 - 10:42:05 PM
     *
     * @public
     * @async
     * @param {string} id
     * @param {number} promoterCpf
     * @returns {*}
     */
    public async execute (id: string, promoterCpf: number) {

        if (!id) {
            throw new ApiError("Id do evento é obrigatório", 422);
        }

        if (!promoterCpf) {
            throw new ApiError("Cpf do promoter é obrigatório", 422);
        }

        const belongsToPromoter: any = await this.eventRepository.findByIdAndCpfPromoter(id, promoterCpf);

        if (!belongsToPromoter) {
            throw new ApiError("Evento não encontrado ou não pertence ao promoter!", 422);
        }

        let newStatus = true;

        if (belongsToPromoter.status == true) {
            newStatus = false
        }

        await this.eventRepository.updateStatus(id, promoterCpf, newStatus);

        const allTicketsEvent: any = await this.ticketRepository.findAllTicketsByEvent(id);

        if (allTicketsEvent && belongsToPromoter.status == true) {

            for (let ticket of allTicketsEvent) {
                
                const walletExists: any = await this.walletRepository.findWallet(ticket.clientCpf);

                if (!walletExists && ticket.status == true){
                    await this.walletRepository.create(ticket.clientCpf, ticket.value);
                } else if(ticket.status == true) {
                    const newAmount = (walletExists.amount + ticket.value)
                    await this.walletRepository.updateWallet(ticket.clientCpf, newAmount)
                }

                await this.ticketRepository.updateStatus(ticket.id);
            }
        }
        
    }
}

export { UpdateStatusEventUseCase };