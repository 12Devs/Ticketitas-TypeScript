//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";

//Import of the EmailProvider and ApiError APIs
import { ApiError } from "../../errors/ApiError";

import { UpdateUserNameUseCase } from "./UpdateUserNameUseCase";

describe('UpdateUserNameController', () => {
  let updateUserNameUseCase: UpdateUserNameUseCase;
  let clientRepository: ClientRepository;
  let promoterRepository: PromoterRepository;
  let administratorRepository: AdministratorRepository

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByCpf: jest.fn().mockReturnValue({cpf: 98765432145}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updateName: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    // Criação de um objeto simulado para o caso de uso (PromoterRepository)
    promoterRepository = {
      findByCpf: jest.fn().mockReturnValue({cpf: 48767432145}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updateName: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as PromoterRepository;

    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByCpf: jest.fn().mockReturnValue({cpf: 18545432145}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updateName: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorRepository;

    // Criação do serviço (UpdateUserNameUseCase) injetando o caso de uso simulado
    updateUserNameUseCase = new UpdateUserNameUseCase(
      clientRepository,
      promoterRepository,
      administratorRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente para cliente
  it('should call execute method of UpdateUserNameUseCase and return a success message regarding the operation (client type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "client";
    const mockCpf = 98765432145;
    const mockName = "Fulaninho de Sá";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateNameSpy = jest.spyOn(clientRepository, 'updateName');
    const promoterUpdateNameSpy = jest.spyOn(promoterRepository, 'updateName');
    const administratorUpdateNameSpy = jest.spyOn(administratorRepository, 'updateName');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserNameUseCase.execute(mockTipo, mockCpf, mockName);

    // Verificar se o método updateName foi chamado com os parâmetros corretos
    expect(clientUpdateNameSpy).toHaveBeenCalledWith(mockCpf, mockName);

    // Verificar se o método updateName não foi chamado
    expect(promoterUpdateNameSpy).not.toHaveBeenCalled();

    // Verificar se o método updateName não foi chamado
    expect(administratorUpdateNameSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute é chamado corretamente para promoter
  it('should call execute method of UpdateUserNameUseCase and return a success message regarding the operation (promoter type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockName = "Zezinho Promotorzao";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateNameSpy = jest.spyOn(clientRepository, 'updateName');
    const promoterUpdateNameSpy = jest.spyOn(promoterRepository, 'updateName');
    const administratorUpdateNameSpy = jest.spyOn(administratorRepository, 'updateName');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserNameUseCase.execute(mockTipo, mockCpf, mockName);

    // Verificar se o método updateName não foi chamado
    expect(clientUpdateNameSpy).not.toHaveBeenCalled();

    // Verificar se o método updateName foi chamado com os parâmetros corretos
    expect(promoterUpdateNameSpy).toHaveBeenCalledWith(mockCpf, mockName);

    // Verificar se o método updateName não foi chamado
    expect(administratorUpdateNameSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute é chamado corretamente para cliente
  it('should call execute method of UpdateUserNameUseCase and return a success message regarding the operation (client type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockName = "Manda Chuva 69";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateNameSpy = jest.spyOn(clientRepository, 'updateName');
    const promoterUpdateNameSpy = jest.spyOn(promoterRepository, 'updateName');
    const administratorUpdateNameSpy = jest.spyOn(administratorRepository, 'updateName');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserNameUseCase.execute(mockTipo, mockCpf, mockName);

    // Verificar se o método updateName não foi chamado
    expect(clientUpdateNameSpy).not.toHaveBeenCalled();

    // Verificar se o método updateName não foi chamado
    expect(promoterUpdateNameSpy).not.toHaveBeenCalled();

    // Verificar se o método updateName foi chamado com os parâmetros corretos
    expect(administratorUpdateNameSpy).toHaveBeenCalledWith(mockCpf, mockName);
  });

  // Teste para verificar se o método execute falha caso o novo nome esteja vazio
  it('should call execute method of UpdateUserNameUseCase, throw an error and NOT return a success message due to lack of new user name', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockName = "";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateNameSpy = jest.spyOn(clientRepository, 'updateName');
    const promoterUpdateNameSpy = jest.spyOn(promoterRepository, 'updateName');
    const administratorUpdateNameSpy = jest.spyOn(administratorRepository, 'updateName');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserNameUseCase.execute(mockTipo, mockCpf, mockName);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O novo nome não pode ser vazio!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateName não foi chamado
    expect(clientUpdateNameSpy).not.toHaveBeenCalled();

    // Verificar se o método updateName não foi chamado
    expect(promoterUpdateNameSpy).not.toHaveBeenCalled();

    // Verificar se o método updateName não foi chamado
    expect(administratorUpdateNameSpy).not.toHaveBeenCalled();
  });
});