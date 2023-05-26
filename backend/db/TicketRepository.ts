import { Ticket } from "../models/Ticket";


class TicketRepository {

    public async create (nameEvent: string, clientCpf: number, sector: string, profile: string, value: number, dateEvent: Date, saleId: string) {

        const newTicket = await Ticket.create({nameEvent, sector, profile, value, dateEvent, saleId, clientCpf});
        return newTicket;
    }

    public async findAllTickets (clientCpf: number) {
        const tickets = await Ticket.findAll({raw: true,
            where: {
                clientCpf: clientCpf
        }});
        return tickets;
    }
}

export { TicketRepository };