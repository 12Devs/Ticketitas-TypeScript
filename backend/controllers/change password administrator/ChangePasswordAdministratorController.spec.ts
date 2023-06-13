import { ChangePasswordAdministratorController } from "./ChangePasswordAdministratorController";
import { ChangePasswordAdministratorUseCase } from "./ChangePasswordAdministratorUseCase";
import { Request, Response } from "express";

describe('LoginAdministratorController', () => {
  let changePasswordAdministratorController: ChangePasswordAdministratorController;
  let changePasswordAdministratorUseCase: ChangePasswordAdministratorUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ChangePasswordAdministratorUseCase)
    changePasswordAdministratorUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ChangePasswordAdministratorUseCase;

    // Criação do controlador (ChangePasswordAdministratorController) injetando o caso de uso simulado
    changePasswordAdministratorController = new ChangePasswordAdministratorController(
      changePasswordAdministratorUseCase
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
        email: "youknownothing456@email.com"
      },
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(changePasswordAdministratorUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const loginInfo = await changePasswordAdministratorController.handle(mockRequest as Request, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("youknownothing456@email.com");

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();
  });
});
