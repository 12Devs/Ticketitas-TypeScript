//Import of the repository classes
import { EventRepository } from "../../db/EventRepository";
import { TicketRepository } from "../../db/TicketRepository";

import { GenerateAllEventsReportUseCase } from "./GenerateAllEventsReportUseCase";

describe('GenerateAllEventsReportController', () => {
  let generateAllEventsReportUseCase: GenerateAllEventsReportUseCase;
  let eventRepository: EventRepository;
  let ticketRepository: TicketRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)
    eventRepository = {
      findAllEventsRaw: jest.fn().mockReturnValue([{
        id: "thisisatestUUID",
        nome: "bestTestEventName123",
        descricao: "notTheBestDescription456",
        dataEvento: "3571-05-23 01:12:57",
        status: 1,
        quantPista: 456,
        quantStage: 76,
        quantVip: 19,
        valorPista: 18.99,
        valorStage: 57.70,
        valorVip: 112.33,
        imageEvent:"thisissuposedtobeanimagelink",
        destaque: 1,
        porcentagemMeia: 50,
        porcentagemGratis: 10
      }]), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrao para as chamadas da função simulada
    } as unknown as EventRepository;

    ticketRepository = {
      findAllTicketsByEvent: jest.fn().mockReturnValue([
        {
          id: "yetAnotherUUID",
          sector: "Pista",
          profile: "Meia-entrada",
          value: 9.12,
          dateEvent: "3571-05-23 01:12:57",
          eventId: "thisisatestUUID"
        },
        {
          id: "justAUUID",
          sector: "Vip",
          profile: "Inteira",
          value: 115.58,
          dateEvent: "3571-05-23 01:12:57",
          eventId: "thisisatestUUID"
        }
      ]), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrao para as chamadas da função simulada
    } as unknown as TicketRepository;

    // Criação do serviço (GenerateAllEventsReportUseCase) injetando o caso de uso simulado
    generateAllEventsReportUseCase = new GenerateAllEventsReportUseCase(
      eventRepository,
      ticketRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of GenerateAllEventsReportUseCase and return a table with all registered events info', async () => {
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const findAllEventsRawSpy = jest.spyOn(eventRepository, 'findAllEventsRaw');
    const findAllTicketsByEventSpy = jest.spyOn(ticketRepository, 'findAllTicketsByEvent');

    // Chamar o método execute do UseCase
    const mockReturn = await generateAllEventsReportUseCase.execute();

    // Verificar se o método findAllEvents foi chamado
    expect(findAllEventsRawSpy).toHaveBeenCalled();

    // Verificar se o método findAllTicketsByEvent foi chamado com o parâmetro correto
    expect(findAllTicketsByEventSpy).toHaveBeenCalledWith("thisisatestUUID");

    //Verificar se o execute retorna os parâmetros desejados
    expect(mockReturn).toStrictEqual(
      {
        eventDataList: [
          {
            eventOwnData:
            {
              id: "thisisatestUUID",
              name: "bestTestEventName123",
              date: "3571-05-23 01:12:57",
              status: 1,
              arenaQuantity: 456,
              stageQuantity: 76,
              vipQuantity: 19,
              arenaPrice: 18.99,
              stagePrice: 57.70,
              vipPrice: 112.33,
              isFeatured: 1,
              halfPricePercentage: 50,
              freePercentage: 10,
            },
            eventSalesData:
            {
              eventTicketCount: 2,
              eventPaymentSum: 124.7,
            }
          }
        ],
        totalEventData:
        {
          totalEventsRegistered: 1,
          totalTicketsBought: 2,
          totalPaymentSum: 124.7
        }
      }
    )
  });
});