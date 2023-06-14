import { UpdateUserPhoneController } from "./UpdateUserPhoneControllerTest";
import { UpdateUserPhoneUseCase } from "./UpdateUserPhoneUseCase";
import { Request, Response } from "express";

export interface UserRequest extends Request {
  user: any
}

describe('UpdateUserPhoneController', () => {
  let updateUserPhoneController: UpdateUserPhoneController;
  let updateUserPhoneUseCase: UpdateUserPhoneUseCase;
  let mockRequest: Partial<UserRequest>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (UpdateUserPhoneUseCase)
    updateUserPhoneUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as UpdateUserPhoneUseCase;

    // Criação do controlador (UpdateUserPhoneController) injetando o caso de uso simulado
    updateUserPhoneController = new UpdateUserPhoneController(
        updateUserPhoneUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of UpdateUserPhoneUseCase and return status 200', async () => {
    
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      body: {
        newPhone: 75991234678
      },
      user: {
        cpf: 48795432145,
        tipo: "promoter"
      }
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(updateUserPhoneUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserPhoneController.handle(mockRequest as UserRequest, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("promoter", 48795432145, 75991234678);

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();

    // Verificar se o método status foi chamado com o código 201
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});