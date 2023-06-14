import { NewPasswordPromoterController } from "./NewPasswordPromoterController";
import { NewPasswordPromoterUseCase } from "./NewPasswordPromoterUseCase";
import { Request, Response } from "express";

describe('LoginPromoterController', () => {
  let newPasswordPromoterController: NewPasswordPromoterController;
  let newPasswordPromoterUseCase: NewPasswordPromoterUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (NewPasswordPromoterUseCase)
    newPasswordPromoterUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as NewPasswordPromoterUseCase;

    // Criação do controlador (NewPasswordPromoterController) injetando o caso de uso simulado
    newPasswordPromoterController = new NewPasswordPromoterController(
      newPasswordPromoterUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of CreatePromoterUseCase and return status 201', async () => {
    
    const mockCode = "jutLTrwzTCzziNEypea0ANuA9hj8JV9R";
    const mockPassword = "NewMyPw5465";

    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      body: {
        passwordChangeCode: mockCode,
        newPassword: mockPassword,
        newPasswordConfirmation: mockPassword

      },
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(newPasswordPromoterUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const loginInfo = await newPasswordPromoterController.handle(mockRequest as Request, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith(mockCode, mockPassword, mockPassword);

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();
  });
});