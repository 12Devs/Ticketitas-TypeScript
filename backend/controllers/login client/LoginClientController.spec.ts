import { LoginClientController } from "./LoginClientController";
import { LoginClientUseCase } from "./LoginClientUseCase";
import { Request, Response } from "express";

describe('LoginClientController', () => {
  let loginClientController: LoginClientController;
  let loginClientUseCase: LoginClientUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (LoginClientUseCase)
    loginClientUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as LoginClientUseCase;

    // Criação do controlador (LoginClientController) injetando o caso de uso simulado
    loginClientController = new LoginClientController(
        loginClientUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of CreateClientUseCase and return status 201', async () => {
    
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      body: {
        email: "youknownothing456@email.com",
        senha: "thisisatestpassword***"
      },
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(loginClientUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const loginInfo = await loginClientController.handle(mockRequest as Request, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("youknownothing456@email.com", "thisisatestpassword***");

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();
  });
});