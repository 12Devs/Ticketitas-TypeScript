import { TicketRepository } from "../../db/TicketRepository";
import { Request, Response}  from "express";

class ListTicketsUseCase {

    private ticketRepository: TicketRepository;

    constructor ( ticketrepository: TicketRepository) {
        this.ticketRepository = ticketrepository;
    }

    public async handle(request: Request, response: Response){
        const allTickets = await this.ticketRepository;
        return response.status(200).json({allTickets})
    }
}