//Import of the repository classes
import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { TicketRepository } from "../../db/TicketRepository";

//Import of the class ApiError
import { ApiError } from "../../errors/ApiError";

/**
 * Class for executing the generation of a data dictonary based upon the ticket sale information on a single event
 * @date 6/4/2023 - 3:42:40 PM
 *
 * @class GenerateEventTicketReportUseCase
 * @typedef {GenerateEventTicketReportUseCase}
 */
class GenerateEventTicketReportUseCase {

    private eventRepository: EventRepository;
    private enderecoEventRepository: EnderecoEventRepository;
    private ticketRepository: TicketRepository;

    /**
     * Creates an instance of GenerateEventTicketReportUseCase.
     * @date 6/4/2023 - 3:42:40 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {EventRepository} eventRepository
     * @param {EnderecoEventRepository} enderecoEventRepository
     * @param {TicketRepository} ticketRepository
     */
    constructor (eventRepository: EventRepository, enderecoEventRepository: EnderecoEventRepository, ticketRepository: TicketRepository) {
        this.eventRepository = eventRepository;
        this.enderecoEventRepository = enderecoEventRepository;
        this.ticketRepository = ticketRepository;
    }

    /**
     * Method for executing the generation of a data dictonary based upon the ticket sale information on a single event
     * @date 6/4/2023 - 3:42:40 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} id ID of the event whose data will be processed
     * @param {number} cpf CPF number of the promoter that requested this action
     * @param {string} tipo Type of the user login
     * @returns {string} (event, enderecoEvent, ticketSaleInfo) -> information tables of the event, its address and ticket sale
     */
    public async execute (id: string, cpf:number, tipo:string){
        
        //Type needs to be that of a promoter
        if (tipo !== "promoter"){
            throw new ApiError("Esta função é destinada ao uso por promotores de venda!", 422);
        }
        
        //Checks for the existence of the event
        const event: any = await this.eventRepository.findOneEvent(id);

        //Event needs to exist
        if(!event) {
            throw new ApiError("Evento não encontrado", 400);
        }

        //The promoter reponsible for the event needs to be the one requesting access to its ticket sales information
        
        console.log(`\n\n${event.promoterCpf}\n\n`);
        console.log(`\n\n${cpf}\n\n`);
        
        if(event.promoterCpf != cpf) {
            throw new ApiError("Este evento não pertence ao promotor logado!", 422);
        }

        //Finds all the tickets related to the event
        const eventTicketList:any = await this.ticketRepository.findAllTicketsByEvent(id);
        
        //
        const enderecoEvent: any = await this.enderecoEventRepository.findOneEnderecoEvent(event.enderecoEventId);
        
        //Variables for ticket counting and calculating total sale sum
        var arenaFullCount = 0;
        var arenaHalfCount = 0;
        var arenaFreeCount = 0;
        var arenaFullTotalPayment = 0.0;
        var arenaHalfTotalPayment = 0.0;
        var arenaFreeTotalPayment = 0.0;

        var stageFullCount = 0;
        var stageHalfCount = 0;
        //var stageFreeCount = 0;
        var stageFullTotalPayment = 0.0;
        var stageHalfTotalPayment = 0.0;
        //var stageFreeTotalPayment = 0.0;

        var vipFullCount = 0;
        var vipHalfCount = 0;
        //var vipFreeCount = 0;
        var vipFullTotalPayment = 0.0;
        var vipHalfTotalPayment = 0.0;
        //var vipFreeTotalPayment = 0.0;

        //Loops through the array of returned
        for (var index in eventTicketList) {
            const actualTicket = eventTicketList[index];
            
            //Increases the count and payment sum for the correct type of ticket bought
            if(actualTicket.sector === "Pista") {
                
                if (actualTicket.profile === "Inteira") {
                    arenaFullCount += 1;
                    arenaFullTotalPayment += actualTicket.value;
                }
                else if (actualTicket.profile === "Meia-entrada") {
                    arenaHalfCount += 1;
                    arenaHalfTotalPayment += actualTicket.value;
                }
                else if (actualTicket.profile === "Grátis") {
                    arenaFreeCount += 1;
                    arenaFreeTotalPayment += actualTicket.value;
                }
            }
            else if(actualTicket.sector === "Stage") {
                
                if (actualTicket.profile === "Inteira") {
                    stageFullCount += 1;
                    stageFullTotalPayment += actualTicket.value;
                }
                else if (actualTicket.profile === "Meia-entrada") {
                    stageHalfCount += 1;
                    stageHalfTotalPayment += actualTicket.value;
                }
                //else if (actualTicket.profile === "Grátis") {
                    //stageFreeCount += 1;
                    //stageFreeTotalPayment += actualTicket.value;
                //}
            }
            else if(actualTicket.sector === "Vip") {
                
                if (actualTicket.profile === "Inteira") {
                    vipFullCount += 1;
                    vipFullTotalPayment += actualTicket.value;
                }
                else if (actualTicket.profile === "Meia-entrada") {
                    vipHalfCount += 1;
                    vipHalfTotalPayment += actualTicket.value;
                }
                //else if (actualTicket.profile === "Grátis") {
                    //vipFreeCount += 1;
                    //vipFreeTotalPayment += actualTicket.value;
                //}
            }
        }

        const totalSoldTickets = (arenaFullCount + arenaHalfCount + arenaFreeCount + stageFullCount + stageHalfCount + vipFullCount + vipHalfCount);
        const totalPaymentSum = (arenaFullTotalPayment + arenaHalfTotalPayment + arenaFreeTotalPayment + stageFullTotalPayment + stageHalfTotalPayment + vipFullTotalPayment + vipHalfTotalPayment);

        const ticketSaleInfo = {
            arenaFullCount: arenaFullCount,
            arenaHalfCount: arenaHalfCount,
            arenaFreeCount: arenaFreeCount,
            arenaFullTotalPayment: arenaFullTotalPayment,
            arenaHalfTotalPayment: arenaHalfTotalPayment,
            arenaFreeTotalPayment: arenaFreeTotalPayment,

            stageFullCount: stageFullCount,
            stageHalfCount: stageHalfCount,
            //stageFreeCount: stageFreeCount,
            stageFullTotalPayment: stageFullTotalPayment,
            stageHalfTotalPayment: stageHalfTotalPayment,
            //stageFreeTotalPayment: stageFreeTotalPayment,
            
            vipFullCount: vipFullCount,
            vipHalfCount: vipHalfCount,
            //vipFreeCount: vipFreeCount,
            vipFullTotalPayment: vipFullTotalPayment,
            vipHalfTotalPayment: vipHalfTotalPayment,
            //vipFreeTotalPayment: vipFreeTotalPayment,

            totalSoldTickets: totalSoldTickets,
            totalPaymentSum: totalPaymentSum
    }

        return { event, enderecoEvent, ticketSaleInfo };
    }

}

export { GenerateEventTicketReportUseCase }; //Class export declarator