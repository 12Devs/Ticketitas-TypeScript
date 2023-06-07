import { Ticket } from "../models/Ticket";


class TicketRepository {

    public async create (nameEvent: string, clientCpf: number, sector: string, profile: string, value: number, dateEvent: Date, saleId: string, eventId: string) {

        const newTicket = await Ticket.create({nameEvent, sector, profile, value, dateEvent, saleId, clientCpf, eventId});
        return newTicket;
    }

    public async findAllTickets (clientCpf: number) {
        const tickets = await Ticket.findAll({raw: true,
            where: {
                clientCpf: clientCpf
        }});
        return tickets;
    }

    public async findAllTicketsByEvent (eventId: string) {
        const tickets = await Ticket.findAll({raw: true,
            where: {
                eventId: eventId
        }});
        return tickets;
    }

    public async updateStatus (id: string){
        await Ticket.update({
            status: false
        },
        {
            where: {
                id: id
            }
        });
    }
}

export { TicketRepository };