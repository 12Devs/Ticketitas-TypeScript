import { CreateCheckoutController } from "./CreateCheckoutController";
import { CreateCheckoutUseCase } from "./CreateCheckoutUseCase";
import { Request, Response } from "express";

describe('CreateCheckoutController', () => {
  let createCheckoutController: CreateCheckoutController;
  let createCheckoutUseCase: CreateCheckoutUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (CreateCheckoutUseCase)
    createCheckoutUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as CreateCheckoutUseCase;

    // Criação do controlador (CreateCheckoutController) injetando o caso de uso simulado
    createCheckoutController = new CreateCheckoutController(
        createCheckoutUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of CreateCheckoutUseCase and return status 201', async () => {
    
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      body: {
        eventId: "thisisaneventidindeed654467",
        pistaAmount: 1,
        stageAmount: 2,
        vipAmount: 0,
        pistaAmountHalf: 0,
        stageAmountHalf: 0,
        vipAmountHalf: 1,
        freeAmount: 3,
        amountSale: 1
      },
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(createCheckoutUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await createCheckoutController.handle(mockRequest as Request, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("thisisaneventidindeed654467", 1, 2, 0, 0, 0, 1, 3, 1);

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();

    // Verificar se o método status foi chamado com o código 201
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});