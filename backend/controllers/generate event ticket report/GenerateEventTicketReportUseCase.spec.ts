//Import of the repository classes
import { EventRepository } from "../../db/EventRepository";
import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { TicketRepository } from "../../db/TicketRepository";

//Import of the ApiError APIs
import { ApiError } from "../../errors/ApiError";

import { GenerateEventTicketReportUseCase } from "./GenerateEventTicketReportUseCase";

describe('GenerateEventTicketReportController, there is an event with the id provided and belonging to a promoter with the provided cpf number in the database', () => {
  let generateEventTicketReportUseCase: GenerateEventTicketReportUseCase;
  let eventRepository: EventRepository;
  let enderecoEventRepository: EnderecoEventRepository;
  let ticketRepository: TicketRepository;

  beforeEach(() => {

    eventRepository = {
      findOneEvent: jest.fn().mockReturnValue({
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
        porcentagemGratis: 10,
        promoterCpf: 65665776452,
        enderecoEventId: "justAnEventAddressId"
      }), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrao para as chamadas da função simulada
    } as unknown as EventRepository;

    enderecoEventRepository = {
      findOneEnderecoEvent: jest.fn().mockReturnValue({
        id: "justAnEventAddressId",
        cep: 12345678,
        estado: "Mato Grosso",
        cidade: "SeiLa",
        bairro: "Perdido",
        rua: "Vielinha",
        numero: 23
      })
    } as unknown as EnderecoEventRepository

    ticketRepository = {
      findAllTicketsByEvent: jest.fn().mockReturnValue([
        {
          id: "yetAnotherUUID",
          sector: "Pista",
          profile: "Meia-entrada",
          value: 9.12,
          dateEvent: "3571-05-23 01:12:57",
          eventId: "thisisatestUUID",
          clientCpf: 85495485412
        },
        {
          id: "justAUUID",
          sector: "Vip",
          profile: "Inteira",
          value: 115.58,
          dateEvent: "3571-05-23 01:12:57",
          eventId: "thisisatestUUID",
          clientCpf: 85495485412
        }
      ]), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrao para as chamadas da função simulada
    } as unknown as TicketRepository;

    // Criação do serviço (GenerateEventTicketReportUseCase) injetando o caso de uso simulado
    generateEventTicketReportUseCase = new GenerateEventTicketReportUseCase(
      eventRepository,
      enderecoEventRepository,
      ticketRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of GenerateEventTicketReportUseCase and return a table with data regarding the event whose id was provided', async () => {
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const findOneEventSpy = jest.spyOn(eventRepository, 'findOneEvent');
    const findOneEnderecoEventSpy = jest.spyOn(enderecoEventRepository, 'findOneEnderecoEvent');
    const findAllTicketsByEventSpy = jest.spyOn(ticketRepository, 'findAllTicketsByEvent');

    // Chamar o método execute do UseCase
    const mockReturn = await generateEventTicketReportUseCase.execute("thisisatestUUID", 65665776452, "promoter");

    // Verificar se o método findOneEvent foi chamado com o parâmetro correto
    expect(findOneEventSpy).toHaveBeenCalledWith("thisisatestUUID");

    // Verificar se o método findAllTicketsByEvent foi chamado com o parâmetro correto
    expect(findAllTicketsByEventSpy).toHaveBeenCalledWith("thisisatestUUID");

    // Verificar se o método findOneEnderecoEvent foi chamado com o parâmetro correto
    expect(findOneEnderecoEventSpy).toHaveBeenCalledWith("justAnEventAddressId");

    //Verificar se o execute retorna os parâmetros desejados
    expect(mockReturn).toStrictEqual(
      {
        event:
        {
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
          porcentagemGratis: 10,
          promoterCpf: 65665776452,
          enderecoEventId: "justAnEventAddressId"
        },
        enderecoEvent: {
          id: "justAnEventAddressId",
          cep: 12345678,
          estado: "Mato Grosso",
          cidade: "SeiLa",
          bairro: "Perdido",
          rua: "Vielinha",
          numero: 23
        },
        ticketSaleInfo: {
          arenaFullCount: 0,
          arenaHalfCount: 1,
          arenaFreeCount: 0,
          arenaFullTotalPayment: 0,
          arenaHalfTotalPayment: 9.12,
          arenaFreeTotalPayment: 0,

          stageFullCount: 0,
          stageHalfCount: 0,
          //stageFreeCount: stageFreeCount,
          stageFullTotalPayment: 0,
          stageHalfTotalPayment: 0,
          //stageFreeTotalPayment: stageFreeTotalPayment,
          
          vipFullCount: 1,
          vipHalfCount: 0,
          //vipFreeCount: vipFreeCount,
          vipFullTotalPayment: 115.58,
          vipHalfTotalPayment: 0,
          //vipFreeTotalPayment: vipFreeTotalPayment,

          totalSoldTickets: 2,
          totalPaymentSum: 124.7
        }
      }
    );
  });

  // Teste para verificar se o método execute falha caso o promotor que fez a requisicao nao seja responsavel pelo evento
  it('should call execute method of GenerateEventTicketReportUseCase, thrown an error and not return anything as the promoter who requested this action is not the owner of the event', async () => {
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const findOneEventSpy = jest.spyOn(eventRepository, 'findOneEvent');
    const findOneEnderecoEventSpy = jest.spyOn(enderecoEventRepository, 'findOneEnderecoEvent');
    const findAllTicketsByEventSpy = jest.spyOn(ticketRepository, 'findAllTicketsByEvent');

     // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
     try {
      await generateEventTicketReportUseCase.execute("thisisatestUUID", 42135758452, "promoter");
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Este evento não pertence ao promotor logado!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findOneEvent foi chamado com o parâmetro correto
    expect(findOneEventSpy).toHaveBeenCalledWith("thisisatestUUID");

    // Verificar se o método findAllTicketsByEvent não foi chamado
    expect(findAllTicketsByEventSpy).not.toHaveBeenCalled();

    // Verificar se o método findOneEnderecoEvent não foi chamado
    expect(findOneEnderecoEventSpy).not.toHaveBeenCalled();
  });
});

describe('GenerateEventTicketReportController, no event whose id matches the provided id was found in the database', () => {
  let generateEventTicketReportUseCase: GenerateEventTicketReportUseCase;
  let eventRepository: EventRepository;
  let enderecoEventRepository: EnderecoEventRepository;
  let ticketRepository: TicketRepository;

  beforeEach(() => {

    eventRepository = {
      findOneEvent: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EventRepository;

    enderecoEventRepository = {
      findOneEnderecoEvent: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EnderecoEventRepository

    ticketRepository = {
      findAllTicketsByEvent: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as TicketRepository;

    // Criação do serviço (GenerateEventTicketReportUseCase) injetando o caso de uso simulado
    generateEventTicketReportUseCase = new GenerateEventTicketReportUseCase(
      eventRepository,
      enderecoEventRepository,
      ticketRepository
    );
  });

  // Teste para verificar se o método execute falha caso o evento nao seja encontrado
  it('should call execute method of GenerateEventTicketReportUseCase, thrown an error and not return anything as no event was found for the id provided', async () => {
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const findOneEventSpy = jest.spyOn(eventRepository, 'findOneEvent');
    const findOneEnderecoEventSpy = jest.spyOn(enderecoEventRepository, 'findOneEnderecoEvent');
    const findAllTicketsByEventSpy = jest.spyOn(ticketRepository, 'findAllTicketsByEvent');

     // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
     try {
      await generateEventTicketReportUseCase.execute("thisisatestUUID", 65665776452, "promoter");
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Evento não encontrado", 400);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findOneEvent foi chamado com o parâmetro correto
    expect(findOneEventSpy).toHaveBeenCalledWith("thisisatestUUID");

    // Verificar se o método findAllTicketsByEvent não foi chamado
    expect(findAllTicketsByEventSpy).not.toHaveBeenCalled();

    // Verificar se o método findOneEnderecoEvent não foi chamado
    expect(findOneEnderecoEventSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso o usuario que fez a requisicao nao seja promotor
  it('should call execute method of GenerateEventTicketReportUseCase, thrown an error and not return anything as the user who requested this action is not a promoter', async () => {
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const findOneEventSpy = jest.spyOn(eventRepository, 'findOneEvent');
    const findOneEnderecoEventSpy = jest.spyOn(enderecoEventRepository, 'findOneEnderecoEvent');
    const findAllTicketsByEventSpy = jest.spyOn(ticketRepository, 'findAllTicketsByEvent');

     // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
     try {
      await generateEventTicketReportUseCase.execute("thisisatestUUID", 65665776452, "client");
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Esta função é destinada ao uso por promotores de venda!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findOneEvent não foi chamado
    expect(findOneEventSpy).not.toHaveBeenCalled();

    // Verificar se o método findAllTicketsByEvent não foi chamado
    expect(findAllTicketsByEventSpy).not.toHaveBeenCalled();

    // Verificar se o método findOneEnderecoEvent não foi chamado
    expect(findOneEnderecoEventSpy).not.toHaveBeenCalled();
  });
});