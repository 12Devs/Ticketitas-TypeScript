import { GenerateClientTicketReportController } from "./GenerateClientTicketReportControllerTest";
import { GenerateClientTicketReportUseCase } from "./GenerateClientTicketReportUseCase";
import { Request, Response } from "express";

export interface UserRequest extends Request {
  user: any
}

describe('GenerateClientTicketReportController', () => {
  let generateClientTicketReportController: GenerateClientTicketReportController;
  let generateClientTicketReportUseCase: GenerateClientTicketReportUseCase;
  let mockRequest: Partial<UserRequest>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (GenerateClientTicketReportUseCase)
    generateClientTicketReportUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as GenerateClientTicketReportUseCase;

    // Criação do controlador (GenerateClientTicketReportController) injetando o caso de uso simulado
    generateClientTicketReportController = new GenerateClientTicketReportController(
        generateClientTicketReportUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of GenerateClientTicketReportUseCase and return status 200', async () => {
    
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      user: {
        cpf: 29768352145,
        tipo: "client"
      }
    };

    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(generateClientTicketReportUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await generateClientTicketReportController.handle(mockRequest as UserRequest, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith(29768352145);

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();

    // Verificar se o método status foi chamado com o código 200
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
