import { CreateAdministratorController } from "./CreateAdministratorController";
import { CreateAdministratorUseCase } from "./CreateAdministratorUseCase";
import { Request, Response } from "express";

describe('CreateAdministratorController', () => {
  let createAdministratorController: CreateAdministratorController;
  let createAdministratorUseCase: CreateAdministratorUseCase;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)
    createAdministratorUseCase = {
      execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as CreateAdministratorUseCase;

    // Criação do controlador (AprovePromoterRegistrationController) injetando o caso de uso simulado
    createAdministratorController = new CreateAdministratorController(
        createAdministratorUseCase
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
        name: "Nome Aleatorio",
        newAdminCpf: 76425315459,
        email: "youknownothing@email.com",
        phone: 75991234567
      },
    };
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(createAdministratorUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await createAdministratorController.handle(mockRequest as Request, mockResponse as Response);

    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("Nome Aleatorio", 76425315459, "youknownothing@email.com", 75991234567);

    // Verificar se o método send foi chamado
    expect(mockResponse.json).toHaveBeenCalled();

    // Verificar se o método status foi chamado com o código 201
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});
