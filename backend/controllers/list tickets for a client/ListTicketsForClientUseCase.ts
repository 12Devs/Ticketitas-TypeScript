import { TicketRepository } from "../../db/TicketRepository";
import { ApiError } from "../../errors/ApiError";

class ListTicketsForClientUseCase {

    private ticketRepository: TicketRepository;

    constructor (ticketRepository: TicketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public async execute (clientCpf: number){
        const tickets: any = await this.ticketRepository.findAllTickets(clientCpf);
    
        if(!tickets) {
            throw new ApiError("Nenhum ticket foi encontrado!", 400);
        }

        return { tickets };
    }

}

export { ListTicketsForClientUseCase };