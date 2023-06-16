//Import of the repository classes
import { CheckoutRepository } from "../../db/CheckoutRepository";
import { EventRepository } from "../../db/EventRepository";

//Import of the EmailProvider and ApiError APIs
import { ApiError } from "../../errors/ApiError";

import { CreateCheckoutUseCase } from "./CreateCheckoutUseCase";

describe('CreateCheckoutController, an event was found with the provided id', () => {
  let createCheckoutUseCase: CreateCheckoutUseCase;
  let checkoutRepository:  CheckoutRepository;
  let eventRepository: EventRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)
    checkoutRepository = {
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as CheckoutRepository;

    eventRepository = {
      findOneEvent: jest.fn().mockReturnValue({id: "thisisamockid"}), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EventRepository;

    // Criação do serviço (CreateCheckoutUseCase) injetando o caso de uso simulado
    createCheckoutUseCase = new CreateCheckoutUseCase(
      checkoutRepository,
      eventRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of CreateCheckoutUseCase and return checkout creation info', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEventId = "thisisamockid";
    const mockPistaAmount = 2;
    const mockStageAmount = 1;
    const mockVipAmount = 0;
    const mockPistaAmountHalf = 0;
    const mockStageAmountHalf = 0;
    const mockVipAmountHalf = 1;
    const mockFreeAmount = 1;
    const mockSaleAmount = 333.50;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const createSpy = jest.spyOn(checkoutRepository, 'create');
    const findOneEventSpy = jest.spyOn(eventRepository, 'findOneEvent');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const mockResponse = await createCheckoutUseCase.execute(mockEventId, mockPistaAmount, mockStageAmount, mockVipAmount, mockPistaAmountHalf, mockStageAmountHalf, mockVipAmountHalf, mockFreeAmount, mockSaleAmount);

    // Verificar se o método findOneEvent foi chamado com os parâmetros corretos
    expect(findOneEventSpy).toHaveBeenCalledWith(mockEventId);

    // Verificar se o método create foi chamado com os parâmetros corretos
    expect(createSpy).toHaveBeenCalledWith(mockEventId, mockPistaAmount, mockStageAmount, mockVipAmount, mockPistaAmountHalf, mockStageAmountHalf, mockVipAmountHalf, mockFreeAmount, mockSaleAmount);

    // Verificar se o a criação foi bem-sucedida por meio de verificação do return
    expect(mockResponse).not.toBe(null);
  });

  // Teste para observar se a verificação de id (não pode estar vazio) é feita corretamente
  it('should call execute method of CreateCheckoutUseCase, throw a custom error and not return any checkout creation info, as the event id is empty', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEventId = "";
    const mockPistaAmount = 2;
    const mockStageAmount = 1;
    const mockVipAmount = 0;
    const mockPistaAmountHalf = 0;
    const mockStageAmountHalf = 0;
    const mockVipAmountHalf = 1;
    const mockFreeAmount = 1;
    const mockSaleAmount = 333.50;
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const createSpy = jest.spyOn(checkoutRepository, 'create');
    const findOneEventSpy = jest.spyOn(eventRepository, 'findOneEvent');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await createCheckoutUseCase.execute(mockEventId, mockPistaAmount, mockStageAmount, mockVipAmount, mockPistaAmountHalf, mockStageAmountHalf, mockVipAmountHalf, mockFreeAmount, mockSaleAmount);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O id do evento é obrigatório!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método findOneEvent não foi chamado
    expect(findOneEventSpy).not.toHaveBeenCalled();
  });
});

describe('CreateCheckoutController, no event with the provided id was found', () => {
  let createCheckoutUseCase: CreateCheckoutUseCase;
  let checkoutRepository:  CheckoutRepository;
  let eventRepository: EventRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)
    checkoutRepository = {
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as CheckoutRepository;

    eventRepository = {
      findOneEvent: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EventRepository;

    // Criação do serviço (CreateCheckoutUseCase) injetando o caso de uso simulado
    createCheckoutUseCase = new CreateCheckoutUseCase(
      checkoutRepository,
      eventRepository,
    );
  });

  // Teste para observar se o metodo execute falha caso um evento com id provido não seja encontrado
  it('should call execute method of CreateCheckoutUseCase, throw a custom error and not return any checkout creation info, as there was no event with the provided id', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEventId = "thisisamockid";
    const mockPistaAmount = 2;
    const mockStageAmount = 1;
    const mockVipAmount = 0;
    const mockPistaAmountHalf = 0;
    const mockStageAmountHalf = 0;
    const mockVipAmountHalf = 1;
    const mockFreeAmount = 1;
    const mockSaleAmount = 333.50;
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const createSpy = jest.spyOn(checkoutRepository, 'create');
    const findOneEventSpy = jest.spyOn(eventRepository, 'findOneEvent');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await createCheckoutUseCase.execute(mockEventId, mockPistaAmount, mockStageAmount, mockVipAmount, mockPistaAmountHalf, mockStageAmountHalf, mockVipAmountHalf, mockFreeAmount, mockSaleAmount);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Evento não encontrado!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findOneEvent foi chamado com o parâmetro correto
    expect(findOneEventSpy).toHaveBeenCalledWith(mockEventId);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();
  });
});