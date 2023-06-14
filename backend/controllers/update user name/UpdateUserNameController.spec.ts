import { UpdateUserNameController } from "./UpdateUserNameController";
import { UpdateUserNameUseCase } from "./UpdateUserNameUseCase";
import { Request, Response } from "express";

export interface UserRequest extends Request {
  user: any
}

describe('UpdateUserNameController', () => {
  let updateUserNameController: UpdateUserNameController;
  let updateUserNameUseCase: UpdateUserNameUseCase;
  let mockRequest: Partial<UserRequest>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (UpdateUserNameUseCase)
    updateUserNameUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as UpdateUserNameUseCase;

    // Criação do controlador (UpdateUserNameController) injetando o caso de uso simulado
    updateUserNameController = new UpdateUserNameController(
        updateUserNameUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of UpdateUserNameUseCase and return status 200', async () => {
    
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      body: {
        newName: "Fulaninho de Sá"
      },
      user: {
        cpf: 98765432145,
        tipo: "client"
      }
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(updateUserNameUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserNameController.handle(mockRequest as UserRequest, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("client", 98765432145, "Fulaninho de Sá");

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();

    // Verificar se o método status foi chamado com o código 201
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});