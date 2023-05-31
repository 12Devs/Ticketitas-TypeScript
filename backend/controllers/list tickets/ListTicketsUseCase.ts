import { TicketRepository } from "../../db/TicketRepository";
import { Request, Response}  from "express";
import { SaleRepository } from "../../db/SaleRepository";
import { EventRepository } from "../../db/EventRepository";

class ListTicketsUseCase {

    private ticketRepository: TicketRepository;
    private saleRespository: SaleRepository;
    private eventRepository: EventRepository;

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