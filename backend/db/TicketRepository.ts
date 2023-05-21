import { Ticket } from "../models/Ticket";


class TicketRepository {

    public async create (clientCpf: number, sector: string, profile: string, value: number, dateEvent: Date, saleId: string) {

        await Ticket.create({sector, profile, value, dateEvent, saleId, clientCpf});
    }
}

export { TicketRepository };