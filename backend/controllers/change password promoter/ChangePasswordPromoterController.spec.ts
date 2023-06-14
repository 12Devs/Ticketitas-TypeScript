import { ChangePasswordPromoterController } from "./ChangePasswordPromoterController";
import { ChangePasswordPromoterUseCase } from "./ChangePasswordPromoterUseCase";
import { Request, Response } from "express";

describe('LoginPromoterController', () => {
  let changePasswordPromoterController: ChangePasswordPromoterController;
  let changePasswordPromoterUseCase: ChangePasswordPromoterUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ChangePasswordPromoterUseCase)
    changePasswordPromoterUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ChangePasswordPromoterUseCase;

    // Criação do controlador (ChangePasswordPromoterController) injetando o caso de uso simulado
    changePasswordPromoterController = new ChangePasswordPromoterController(
      changePasswordPromoterUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of CreatePromoterUseCase and return status 201', async () => {
    
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      body: {
        email: "youknownothing456@email.com"
      },
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(changePasswordPromoterUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const loginInfo = await changePasswordPromoterController.handle(mockRequest as Request, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("youknownothing456@email.com");

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();
  });
});