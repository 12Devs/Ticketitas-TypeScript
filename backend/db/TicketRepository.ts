import { Ticket } from "../models/Ticket";


class TicketRepository {

    public async create (clientCpf: number, sector: string, profile: string, value: number, dateEvent: Date, saleId: string) {

        const newTicket = await Ticket.create({sector, profile, value, dateEvent, saleId, clientCpf});
        return newTicket;
    }
}

export { TicketRepository };