import { AprovePromoterRegistrationController } from "./AprovePromoterRegistrationController";
import { AprovePromoterRegistrationUseCase } from "./AprovePromoterRegistrationUseCase";
import { Request, Response } from "express";

describe('AprovePromoterRegistrationController', () => {
  let aprovePromoterRegistrationController: AprovePromoterRegistrationController;
  let aprovePromoterRegistrationUseCase: AprovePromoterRegistrationUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)
    aprovePromoterRegistrationUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AprovePromoterRegistrationUseCase;

    // Criação do controlador (AprovePromoterRegistrationController) injetando o caso de uso simulado
    aprovePromoterRegistrationController = new AprovePromoterRegistrationController(
      aprovePromoterRegistrationUseCase
    );

    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      params: {
        promoterCpf: '1234567890',
      },
    };

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      send: jest.fn(),
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of AprovePromoterRegistrationUseCase and return status 204', async () => {
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(aprovePromoterRegistrationUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await aprovePromoterRegistrationController.handle(mockRequest as Request, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith('1234567890');

    // Verificar se o método status foi chamado com o código 204
    expect(mockResponse.status).toHaveBeenCalledWith(204);

    // Verificar se o método send foi chamado
    expect(mockResponse.send).toHaveBeenCalled();
  });
});
