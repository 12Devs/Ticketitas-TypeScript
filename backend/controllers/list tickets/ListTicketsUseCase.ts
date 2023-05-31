import { TicketRepository } from "../../db/TicketRepository";


class ListTicketsUseCase {

    private ticketRepository: TicketRepository;

    constructor ( ticketrepository: TicketRepository) {
        this.ticketRepository = ticketrepository;
    }

    public async execute(){
        const allTickets = await this.ticketRepository
    }
}