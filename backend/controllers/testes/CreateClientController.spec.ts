import { CreateClientController } from "../create client/CreateClientController";
import { CreateClientUseCase } from "../create client/CreateClientUseCase";
import { Request, Response } from "express";
import { ApiError } from "../../errors/ApiError";

describe("CreateClientController", () => {
  let createClientUseCase: CreateClientUseCase;
  let createClientController: CreateClientController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    createClientUseCase = {
      execute: jest.fn().mockResolvedValue({ newClient: { name: "John", email: "john@test.com" } }),
    } as unknown as CreateClientUseCase;

    createClientController = new CreateClientController(createClientUseCase);

    mockRequest = {
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
  });

  it("should create a new client", async () => {
    const clientData = {
      nome: "John",
      cpf: 75316609549,
      email: "john@test.com",
      telefone: 123456789,
      senha: "test123",
      confirmacaoSenha: "test123",
      cep: 44190000,
      cidade: "feira",
      estado: "bahia",
      bairro: "centro",
      rua: "rua teste",
      numero: 123,
    };

    mockRequest.body = clientData;

    await createClientController.handle(mockRequest as Request, mockResponse as Response);

    expect(createClientUseCase.execute).toHaveBeenCalledWith(
      clientData.nome,
      clientData.cpf,
      clientData.email,
      clientData.telefone,
      clientData.senha,
      clientData.confirmacaoSenha,
      clientData.cep,
      clientData.cidade,
      clientData.estado,
      clientData.bairro,
      clientData.rua,
      clientData.numero
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ createInfo: { newClient: { name: "John", email: "john@test.com" } } });
  });

  it("should return an error when creating a client with an existing CPF", async () => {
    const clientData = {
      nome: "John",
      cpf: 75316609549,
      email: "john@test.com",
      telefone: 123456789,
      senha: "test123",
      confirmacaoSenha: "test123",
      cep: 44190000,
      cidade: "feira",
      estado: "bahia",
      bairro: "centro",
      rua: "rua teste",
      numero: 123,
    };

    mockRequest.body = clientData;

    createClientUseCase.execute = jest.fn().mockImplementation((nome, cpf) => {
      if (cpf === clientData.cpf) {
        throw new ApiError("Utilize outro cpf", 422);
      }
      return { newClient: { name: nome, email: clientData.email } };
    });

    await expect(
      createClientController.handle(mockRequest as Request, mockResponse as Response)
    ).rejects.toThrow(ApiError);

    expect(mockResponse.status).toHaveBeenCalledWith(422);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Utilize outro cpf" });
  });
});
