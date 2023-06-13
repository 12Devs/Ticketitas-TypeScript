import { LoginAdministratorController } from "./LoginAdministratorController";
import { LoginAdministratorUseCase } from "./LoginAdministratorUseCase";
import { Request, Response } from "express";

describe('LoginAdministratorController', () => {
  let loginAdministratorController: LoginAdministratorController;
  let loginAdministratorUseCase: LoginAdministratorUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)
    loginAdministratorUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as LoginAdministratorUseCase;

    // Criação do controlador (AprovePromoterRegistrationController) injetando o caso de uso simulado
    loginAdministratorController = new LoginAdministratorController(
        loginAdministratorUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of CreateAdministratorUseCase and return status 201', async () => {
    
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      body: {
        email: "youknownothing456@email.com",
        senha: "thisisatestpassword***"
      },
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(loginAdministratorUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const loginInfo = await loginAdministratorController.handle(mockRequest as Request, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("youknownothing456@email.com", "thisisatestpassword***");

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
