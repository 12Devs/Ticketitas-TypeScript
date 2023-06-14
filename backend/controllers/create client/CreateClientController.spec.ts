import {CreateClientController} from "./CreateClientController";
import {CreateClientUseCase} from "./CreateClientUseCase";
import { Request, Response } from "express";

describe("CreateClientController", () => {
    let CreateClientControllerTest: CreateClientController;
    let CreateClientUseCase: CreateClientUseCase;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        // Criação de um objeto simulado para o caso de uso (CreateClientUseCase)
        CreateClientUseCase = {
          execute: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
        } as unknown as CreateClientUseCase;
    
        // Criação do controlador (CreateClientController) injetando o caso de uso simulado
        CreateClientControllerTest = new CreateClientController(
            CreateClientUseCase
        );
    
        // Criação de um objeto simulado para a resposta (Response)
        mockResponse = {
          status: jest.fn().mockReturnThis(), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnThis() para encadear chamadas de método
          json: jest.fn()
        };
      });
    // Teste para verificar se o método handle é chamado corretamente
    it('should call execute method of CreateClientController and return status 201', async () => {
    // Criação de um objeto simulado para a requisição (Request)
    mockRequest = {
        body: {
            nome: "Batatinha",
            cpf: "123456789",
            email: "Batatinha@gmail.com",
            telefone: "123456789",
            senha: "senha123",
            confirmacaoSenha: "senha123",
            cep: "12345678",
            cidade: "Batatopoles",
            estado: "batatones",
            bairro: "Bairro da batata",
            rua: "Potato",
            numero: "00",
          },
        };
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const executeSpy = jest.spyOn(CreateClientUseCase, 'execute');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await CreateClientController.handle(mockRequest as Request, mockResponse as Response);
    
    // Verificar se o método execute foi chamado com o parâmetro correto
    expect(executeSpy).toHaveBeenCalledWith("Nome Batatinha", "123456789", "Batatinha@gmail.com", "123456789","senha123", "senha123","12345678", "Batatopoles", "batatones", "Bairro da batata", "Potato","00");

    // Verificar se o método status foi chamado com o código 201
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    // Verificar se o método send foi chamado
    expect(mockResponse.send).toHaveBeenCalled();
    });
  });