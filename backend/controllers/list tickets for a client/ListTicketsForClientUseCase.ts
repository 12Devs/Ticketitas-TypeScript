import { TicketRepository } from "../../db/TicketRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * List tickets for a client use case class
 * @date 6/6/2023 - 10:31:57 PM
 *
 * @class ListTicketsForClientUseCase
 * @typedef {ListTicketsForClientUseCase}
 */
class ListTicketsForClientUseCase {
    
    /**
     * Creates an instance of {@link ListTicketsForClientUseCase}.
     * @date 6/6/2023 - 10:32:02 PM
     *
     * @private
     * @type {TicketRepository}
     */
    private ticketRepository: TicketRepository;
    
    /**
     * Creates an instance of ListTicketsForClientUseCase.
     * @date 6/6/2023 - 10:32:06 PM
     *
     * @constructor
     * @param {TicketRepository} ticketRepository
     */
    constructor (ticketRepository: TicketRepository) {
        this.ticketRepository = ticketRepository;
    }
    
    /**
     * Method for make a creation of a ticket
     * @date 6/6/2023 - 10:32:11 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @returns {unknown}
     */
    public async execute (clientCpf: number){
        const tickets: any = await this.ticketRepository.findAllTickets(clientCpf);
    
        if(!tickets) {
            throw new ApiError("Nenhum ticket foi encontrado!", 400);
        }

        return { tickets };
    }

}

export { ListTicketsForClientUseCase };