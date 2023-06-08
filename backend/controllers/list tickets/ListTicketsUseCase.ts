import { TicketRepository } from "../../db/TicketRepository";
import { Request, Response}  from "express";
import { SaleRepository } from "../../db/SaleRepository";
import { EventRepository } from "../../db/EventRepository";

/**
 * List tickets use case class
 * @date 6/6/2023 - 10:29:25 PM
 *
 * @class ListTicketsUseCase
 * @typedef {ListTicketsUseCase}
 */
class ListTicketsUseCase {
    
    /**
     * Creates an instance of {@link ListTicketsUseCase}.
     * @date 6/6/2023 - 10:29:31 PM
     *
     * @private
     * @type {TicketRepository}
     */
    private ticketRepository: TicketRepository;
    private saleRespository: SaleRepository;
    private eventRepository: EventRepository;
    
    /**
     * Creates an instance of ListTicketsUseCase.
     * @date 6/6/2023 - 10:29:39 PM
     *
     * @constructor
     * @param {TicketRepository} ticketrepository
     */
    constructor ( ticketrepository: TicketRepository) {
        this.ticketRepository = ticketrepository;
    }

    // public async execute() {

    //     const allHighlights: any = await this.eventRepository.findAllHighlights();

    //     for (let highlight of allHighlights) {
    //         const enderecoHighlight = await this.enderecoEventRepository.findOneEnderecoEvent(highlight.enderecoEventId);
    //         highlight.enderecoEvent = enderecoHighlight;
    //     }
    //     return allHighlights;
    // }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:29:44 PM
     *
     * @public
     * @async
     * @param {Request} request
     * @param {Response} response
     * @returns {unknown}
     */
    public async handle(request: Request, response: Response){
        const allTickets = await this.ticketRepository.findAllTickets(); // lista todos os tickets do bd
        
        const allEvents = await this.eventRepository.findAllEvents()

        for ( let event of allEvents){
            // descobrir as vendas pelo id do evento
            const salesEvent = await this.saleRespository.findSaleByEventId(`${event.id}`);
            // tem que pegar o id do evento
        }

        //      procuro o id da venda pelo cpf do cliente (já tem função)
        const sale = await this.saleRespository.findIdByCpf(0);

        //          na venda, tem o id do evento
        //      acho o evento pelo id

       // preciso ver como separar e organizar os tickets para os eventos que eles pertencem 
        return response.status(200).json({allTickets})
    }
}