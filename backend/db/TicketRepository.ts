import { Ticket } from "../models/Ticket";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 11:05:41 PM
 *
 * @class TicketRepository
 * @typedef {TicketRepository}
 */
class TicketRepository {
    
    /**
     * Creates an instance of {@link TicketRepository}.
     * @date 6/6/2023 - 11:05:45 PM
     *
     * @public
     * @async
     * @param {string} nameEvent
     * @param {number} clientCpf
     * @param {string} sector
     * @param {string} profile
     * @param {number} value
     * @param {Date} dateEvent
     * @param {string} saleId
     * @param {string} eventId
     * @returns {unknown}
     */
    public async create (nameEvent: string, clientCpf: number, sector: string, profile: string, value: number, dateEvent: Date, saleId: string, eventId: string) {

        const newTicket = await Ticket.create({nameEvent, sector, profile, value, dateEvent, saleId, clientCpf, eventId});
        return newTicket;
    }
    
    /**
     * Find all tickets by client cpf
     * @date 6/6/2023 - 11:05:49 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @returns {unknown}
     */
    public async findAllTickets (clientCpf: number) {
        const tickets = await Ticket.findAll({raw: true,
            where: {
                clientCpf: clientCpf
        }});
        return tickets;
    }
    
    /**
     * Find all tickets by event id
     * @date 6/6/2023 - 11:05:56 PM
     *
     * @public
     * @async
     * @param {string} eventId
     * @returns {unknown}
     */
    public async findAllTicketsByEvent (eventId: string) {
        const tickets = await Ticket.findAll({raw: true,
            where: {
                eventId: eventId
        }});
        return tickets;
    }
    
    /**
     * Update status of ticket
     * @date 6/6/2023 - 11:06:07 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {*}
     */
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