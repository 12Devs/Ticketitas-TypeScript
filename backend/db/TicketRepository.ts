import { Ticket } from "../models/Ticket";


class TicketRepository {

    public async create (clientCpf: number, sector: string, profile: string, value: number, dateEvent: Date, saleId: string) {

        const newTicket = await Ticket.create({sector, profile, value, dateEvent, saleId, clientCpf});
        return newTicket;
    }

    public async findAllTickets () {
        const allTickets = await Ticket.findAll({raw: true, where: {
            destaque: true
        }});
        return allTickets;
    }
}

export { TicketRepository };