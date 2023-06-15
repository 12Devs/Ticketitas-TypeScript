import { UpdateUserEmailController } from "./UpdateUserEmailControllerTest";
import { UpdateUserEmailUseCase } from "./UpdateUserEmailUseCase";
import { Request, Response } from "express";

export interface UserRequest extends Request {
  user: any
}

describe('UpdateUserEmailController', () => {
  let updateUserEmailController: UpdateUserEmailController;
  let updateUserEmailUseCase: UpdateUserEmailUseCase;
  let mockRequest: Partial<UserRequest>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (UpdateUserEmailUseCase)
    updateUserEmailUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as UpdateUserEmailUseCase;

    // Criação do controlador (UpdateUserEmailController) injetando o caso de uso simulado
    updateUserEmailController = new UpdateUserEmailController(
        updateUserEmailUseCase
    );

    // Criação de um objeto simulado para a resposta (Response)
    mockResponse = {
      status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
      json: jest.fn()
    };
  });

  // Teste para verificar se o método handle é chamado corretamente
  it('should call execute method of UpdateUserEmailUseCase and return status 200', async () => {
    
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
      body: {
        passwordAuth: "yVCW8DIEgyAG1LWKBSlN8tfm",
        newEmail: "thisisatestemail@notanemail.com",
        newEmailConfirmation: "thisisatestemail@notanemail.com"
      },
      user: {
        cpf: 38768332145,
        tipo: "administrator"
      }
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(updateUserEmailUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserEmailController.handle(mockRequest as UserRequest, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("administrator", 38768332145, "yVCW8DIEgyAG1LWKBSlN8tfm", "thisisatestemail@notanemail.com", "thisisatestemail@notanemail.com");

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();

    // Verificar se o método status foi chamado com o código 201
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});