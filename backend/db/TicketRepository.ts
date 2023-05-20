import { Ticket } from "../models/Ticket";


class TicketRepository {

    public create (clientCpf: number, sector: string, profile: string, value: number, dateEvent: Date) {

        Ticket.create({sector, profile, value, dateEvent, clientCpf});
    }
}

export { TicketRepository };