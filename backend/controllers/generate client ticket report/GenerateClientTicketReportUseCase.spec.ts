//Import of the repository classes
import { TicketRepository } from "../../db/TicketRepository";
import { ClientRepository } from "../../db/ClientRepository";

//Import of the ApiError APIs
import { ApiError } from "../../errors/ApiError";

import { GenerateClientTicketReportUseCase } from "./GenerateClientTicketReportUseCase";

describe('GenerateClientTicketReportController, there is a client with the provided cpf number in the database', () => {
  let generateClientTicketReportUseCase: GenerateClientTicketReportUseCase;
  let ticketRepository: TicketRepository;
  let clientRepository: ClientRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)

    ticketRepository = {
      findAllTickets: jest.fn().mockReturnValue([
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

    clientRepository = {
      findOneClient: jest.fn().mockReturnValue({
        nome: "Clientao001",
        cpf: 85495485412,
        email: "whateverclientemail@email.com",
        telefone: 75992384737,
        senha: "thisdefinitelywontbechecked",
        avatarImage: "thisisthelinkforanimage",
      }), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrao para as chamadas da função simulada
    } as unknown as ClientRepository;

    // Criação do serviço (GenerateClientTicketReportUseCase) injetando o caso de uso simulado
    generateClientTicketReportUseCase = new GenerateClientTicketReportUseCase(
      ticketRepository,
      clientRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of GenerateClientTicketReportUseCase and return a table with all registered events info', async () => {
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const findAllTicketsSpy = jest.spyOn(ticketRepository, 'findAllTickets');
    const findOneClientSpy = jest.spyOn(clientRepository, 'findOneClient');

    // Chamar o método execute do UseCase
    const mockReturn = await generateClientTicketReportUseCase.execute(85495485412);

    // Verificar se o método findAllTickets foi chamado com o parâmetro correto
    expect(findAllTicketsSpy).toHaveBeenCalledWith(85495485412);

    // Verificar se o método findOneClient foi chamado com o parâmetro correto
    expect(findOneClientSpy).toHaveBeenCalledWith(85495485412);

    //Verificar se o execute retorna os parâmetros desejados
    expect(mockReturn).toStrictEqual(
      {
        clientInfo:
        {
          cpf: 85495485412,
          name: "Clientao001",
          email: "whateverclientemail@email.com",
          phone: 75992384737
        },
        clientTicketList: [
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
        ],
        ticketsPerClientInfo: {
          totalTicketsBought: 2,
          totalPaymentSum: 124.7
        }
      }
    );
  });
});

describe('GenerateClientTicketReportController, no client with the provided cpf number was found in the database', () => {
  let generateClientTicketReportUseCase: GenerateClientTicketReportUseCase;
  let ticketRepository: TicketRepository;
  let clientRepository: ClientRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)

    ticketRepository = {
      findAllTickets: jest.fn().mockReturnValue([
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

    clientRepository = {
      findOneClient: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    // Criação do serviço (GenerateClientTicketReportUseCase) injetando o caso de uso simulado
    generateClientTicketReportUseCase = new GenerateClientTicketReportUseCase(
      ticketRepository,
      clientRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of GenerateClientTicketReportUseCase and return a table with all registered events info', async () => {
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const findAllTicketsSpy = jest.spyOn(ticketRepository, 'findAllTickets');
    const findOneClientSpy = jest.spyOn(clientRepository, 'findOneClient');

     // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
     try {
      await generateClientTicketReportUseCase.execute(85495485412);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Cliente não encontrado", 400);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findAllTickets foi chamado com o parâmetro correto
    expect(findAllTicketsSpy).toHaveBeenCalledWith(85495485412);

    // Verificar se o método findOneClient foi chamado com o parâmetro correto
    expect(findOneClientSpy).toHaveBeenCalledWith(85495485412);
  });
});