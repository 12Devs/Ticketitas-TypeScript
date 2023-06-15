import { UpdateUserPasswordController } from "./UpdateUserPasswordControllerTest";
import { UpdateUserPasswordUseCase } from "./UpdateUserPasswordUseCase";
import { Request, Response } from "express";

export interface UserRequest extends Request {
  user: any
}

describe('UpdateUserPasswordController', () => {
  let updateUserPasswordController: UpdateUserPasswordController;
  let updateUserPasswordUseCase: UpdateUserPasswordUseCase;
  let mockRequest: Partial<UserRequest>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (UpdateUserPasswordUseCase)
    updateUserPasswordUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as UpdateUserPasswordUseCase;

    // Criação do controlador (UpdateUserPasswordController) injetando o caso de uso simulado
    updateUserPasswordController = new UpdateUserPasswordController(
        updateUserPasswordUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of UpdateUserPasswordUseCase and return status 200', async () => {
    
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      body: {
        passwordAuth: "yVCW8DIEgyAG1LWKBSlN8tfm",
        newPassword: "3miLySLn3xaIJfX2ttbkVJ4JzXH",
        newPasswordConfirmation: "3miLySLn3xaIJfX2ttbkVJ4JzXH"
      },
      user: {
        cpf: 38768332145,
        tipo: "administrator"
      }
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(updateUserPasswordUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserPasswordController.handle(mockRequest as UserRequest, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("administrator", 38768332145, "yVCW8DIEgyAG1LWKBSlN8tfm", "3miLySLn3xaIJfX2ttbkVJ4JzXH", "3miLySLn3xaIJfX2ttbkVJ4JzXH");

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();

    // Verificar se o método status foi chamado com o código 201
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});