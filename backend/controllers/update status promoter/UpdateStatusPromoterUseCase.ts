import { EventRepository } from "../../db/EventRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { WalletRepository } from "../../db/WalletRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * Update status promoter use case class
 * @date 6/6/2023 - 10:42:35 PM
 *
 * @class UpdateStatusPromoterUseCase
 * @typedef {UpdateStatusPromoterUseCase}
 */
class UpdateStatusPromoterUseCase {
    
    /**
     * Create an instance of {@link UpdateStatusPromoterUseCase}
     * @date 6/6/2023 - 10:42:43 PM
     *
     * @private
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;
    private eventRepository: EventRepository;
    private ticketRepository: TicketRepository;
    private walletRepository: WalletRepository;
    
    /**
     * Creates an instance of UpdateStatusPromoterUseCase.
     * @date 6/6/2023 - 10:42:47 PM
     *
     * @constructor
     * @public
     * @param {PromoterRepository} promoterRepository
     * @param {EventRepository} eventRepository
     * @param {TicketRepository} ticketRepository
     * @param {WalletRepository} walletRepository
     */
    public constructor (promoterRepository: PromoterRepository, eventRepository: EventRepository, ticketRepository: TicketRepository, walletRepository: WalletRepository) {
        this.promoterRepository = promoterRepository;
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
        this.walletRepository = walletRepository;
    }
    
    /**
     * Method for make a update of a promoter status
     * @date 6/6/2023 - 10:42:52 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {*}
     */
    public async execute (cpf: number) {
        
        if(!cpf) {
            throw new ApiError("O cpf do promoter é obrigatório!", 422);
        }

        const promoterExists: any = await this.promoterRepository.findByCpf(cpf);

        if (!promoterExists) {
            throw new ApiError("Promoter não encontrado!", 422);
        }

        let newStatus = true;

        if (promoterExists.status == true) {
            newStatus = false
        }

        await this.promoterRepository.updateStatus(cpf, newStatus);

        const allEventsByPromoter: any = await this.eventRepository.findIdStatuByCpfPromoter(cpf);

        if (!allEventsByPromoter) {
            return
        }
        
        for (let event of allEventsByPromoter) {
            if (event.status == true) {
                await this.eventRepository.supendEvent(event.promoterCpf);

                const allTicketsEvent: any = await this.ticketRepository.findAllTicketsByEvent(event.id);

                if (allTicketsEvent) {
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
        
    }

}

export { UpdateStatusPromoterUseCase };