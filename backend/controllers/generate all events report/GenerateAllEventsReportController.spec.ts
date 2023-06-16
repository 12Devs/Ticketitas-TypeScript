import { GenerateAllEventsReportController } from "./GenerateAllEventsReportController";
import { GenerateAllEventsReportUseCase } from "./GenerateAllEventsReportUseCase";
import { Request, Response } from "express";

describe('GenerateAllEventsReportController', () => {
  let generateAllEventsReportController: GenerateAllEventsReportController;
  let generateAllEventsReportUseCase: GenerateAllEventsReportUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (GenerateAllEventsReportUseCase)
    generateAllEventsReportUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as GenerateAllEventsReportUseCase;

    // Criação do controlador (GenerateAllEventsReportController) injetando o caso de uso simulado
    generateAllEventsReportController = new GenerateAllEventsReportController(
        generateAllEventsReportUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of GenerateAllEventsReportUseCase and return status 200', async () => {
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(generateAllEventsReportUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await generateAllEventsReportController.handle(mockRequest as Request, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalled();

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();

    // Verificar se o método status foi chamado com o código 200
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
