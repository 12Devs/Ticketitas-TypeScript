//Import of the repository classes
import { EventRepository } from "../../db/EventRepository";
import { TicketRepository } from "../../db/TicketRepository";

/**
 * Class for executing the generation of a data array-dictonary based upon all event information (details apply)
 * @date 6/5/2023 - 5:49:38 PM
 *
 * @class GenerateAllEventsReportUseCase
 * @typedef {GenerateAllEventsReportUseCase}
 */
class GenerateAllEventsReportUseCase {

    private eventRepository: EventRepository;
    private ticketRepository: TicketRepository;

    /**
     * Creates an instance of GenerateAllEventsReportUseCase.
     * @date 6/5/2023 - 5:49:38 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {EventRepository} eventRepository
     * @param {TicketRepository} ticketRepository
     */
    constructor (eventRepository: EventRepository, ticketRepository: TicketRepository) {
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
    }

    /**
     * Method for executing the generation of a data array-dictonary based upon all event information (details apply)
     * @date 6/5/2023 - 5:49:38 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @returns {string} (eventDataList, totalEventData) -> information array-tables of all events and their ticket sales
     */
    public async execute (){
        
        //Checks for the existence of any event and returns a list of all of them
        const allEvents: any = await this.eventRepository.findAllEventsRaw();
        
        //Initialization of the event data list (array of table) and the deletion of its empty first element (not sure if it's possible to not generate it in Javascript/Typescript, but it is a failsafe workaround, nonetheless)
        var eventDataList = [{}];
        eventDataList.pop();

        //Variables for counting the total amount of events, tickets and payment received
        var totalEventsRegistered = 0;
        var totalTicketsBought = 0;
        var totalPaymentSum = 0;

        //Loops through the list of events
        for(var eventIndex in allEvents) {
            totalEventsRegistered += 1;
            const actualEvent = allEvents[eventIndex];

            //Variables for counting tickets sold and payment received, per event
            var actualEventTicketCount = 0;
            var actualEventPaymentSum = 0;

            //Checks for the existence of tickets for a specific event and returns a list with all the tickets found
            const allTicketsForTheEvent: any = await this.ticketRepository.findAllTicketsByEvent(actualEvent.id);

            //Loops through every ticket of the list
            for(var ticketIndex in allTicketsForTheEvent) {
                actualEventTicketCount += 1;
                
                const actualTicket = allTicketsForTheEvent[ticketIndex];
                actualEventPaymentSum += actualTicket.value;
            }

            //Sums the event totals to the global totals
            totalTicketsBought += actualEventTicketCount;
            totalPaymentSum += actualEventPaymentSum;

            //Adds the information obtained to the event data list
            eventDataList.push({
                
                eventOwnData: {
                    id: actualEvent.id,
                    name: actualEvent.nome,
                    date: actualEvent.dataEvento,
                    status: actualEvent.status,
                    arenaQuantity: actualEvent.quantPista,
                    stageQuantity: actualEvent.quantStage,
                    vipQuantity: actualEvent.quantVip,
                    arenaPrice: actualEvent.valorPista,
                    stagePrice: actualEvent.valorStage,
                    vipPrice: actualEvent.valorVip,
                    isFeatured: actualEvent.destaque,
                    halfPricePercentage: actualEvent.porcentagemMeia,
                    freePercentage: actualEvent.porcentagemGratis,
                },
                eventSalesData: {
                    eventTicketCount: actualEventTicketCount,
                    eventPaymentSum: actualEventPaymentSum
                }

            });
        }
        
        //Initialization of the global data table
        const totalEventData = {
            totalEventsRegistered: totalEventsRegistered,
            totalTicketsBought: totalTicketsBought,
            totalPaymentSum: totalPaymentSum
        }

        //Returns the event data list and global data table
        return { eventDataList, totalEventData };
    }

}

export { GenerateAllEventsReportUseCase }; //Class export declarator