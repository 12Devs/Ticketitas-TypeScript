//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";

//Import of the EmailProvider and ApiError APIs
import { ApiError } from "../../errors/ApiError";

import { UpdateUserPhoneUseCase } from "./UpdateUserPhoneUseCase";

describe('UpdateUserPhoneController', () => {
  let updateUserPhoneUseCase: UpdateUserPhoneUseCase;
  let clientRepository: ClientRepository;
  let promoterRepository: PromoterRepository;
  let administratorRepository: AdministratorRepository

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByCpf: jest.fn().mockReturnValue({cpf: 98765432145}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updatePhone: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    // Criação de um objeto simulado para o caso de uso (PromoterRepository)
    promoterRepository = {
      findByCpf: jest.fn().mockReturnValue({cpf: 48767432145}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updatePhone: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as PromoterRepository;

    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByCpf: jest.fn().mockReturnValue({cpf: 18545432145}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updatePhone: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorRepository;

    // Criação do serviço (UpdateUserPhoneUseCase) injetando o caso de uso simulado
    updateUserPhoneUseCase = new UpdateUserPhoneUseCase(
      clientRepository,
      promoterRepository,
      administratorRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente para cliente
  it('should call execute method of UpdateUserPhoneUseCase and return a success message regarding the operation (client type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "client";
    const mockCpf = 98765432145;
    const mockPhone = 71991876543;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePhoneSpy = jest.spyOn(clientRepository, 'updatePhone');
    const promoterUpdatePhoneSpy = jest.spyOn(promoterRepository, 'updatePhone');
    const administratorUpdatePhoneSpy = jest.spyOn(administratorRepository, 'updatePhone');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserPhoneUseCase.execute(mockTipo, mockCpf, mockPhone);

    // Verificar se o método updatePhone foi chamado com os parâmetros corretos
    expect(clientUpdatePhoneSpy).toHaveBeenCalledWith(mockCpf, mockPhone);

    // Verificar se o método updatePhone não foi chamado
    expect(promoterUpdatePhoneSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePhone não foi chamado
    expect(administratorUpdatePhoneSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute é chamado corretamente para promoter
  it('should call execute method of UpdateUserPhoneUseCase and return a success message regarding the operation (promoter type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockPhone = 73991266543;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePhoneSpy = jest.spyOn(clientRepository, 'updatePhone');
    const promoterUpdatePhoneSpy = jest.spyOn(promoterRepository, 'updatePhone');
    const administratorUpdatePhoneSpy = jest.spyOn(administratorRepository, 'updatePhone');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserPhoneUseCase.execute(mockTipo, mockCpf, mockPhone);

    // Verificar se o método updatePhone não foi chamado
    expect(clientUpdatePhoneSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePhone foi chamado com os parâmetros corretos
    expect(promoterUpdatePhoneSpy).toHaveBeenCalledWith(mockCpf, mockPhone);

    // Verificar se o método updatePhone não foi chamado
    expect(administratorUpdatePhoneSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute é chamado corretamente para administrator
  it('should call execute method of UpdateUserPhoneUseCase and return a success message regarding the operation (administrator type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockPhone = 73991266543;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePhoneSpy = jest.spyOn(clientRepository, 'updatePhone');
    const promoterUpdatePhoneSpy = jest.spyOn(promoterRepository, 'updatePhone');
    const administratorUpdatePhoneSpy = jest.spyOn(administratorRepository, 'updatePhone');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserPhoneUseCase.execute(mockTipo, mockCpf, mockPhone);

    // Verificar se o método updatePhone não foi chamado
    expect(clientUpdatePhoneSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePhone não foi chamado
    expect(promoterUpdatePhoneSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePhone foi chamado com os parâmetros corretos
    expect(administratorUpdatePhoneSpy).toHaveBeenCalledWith(mockCpf, mockPhone);
  });

  // Teste para verificar se o método execute falha caso o novo nome esteja vazio
  it('should call execute method of UpdateUserPhoneUseCase, throw an error and NOT return a success message due to lack of new user phone', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockPhone = 0;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePhoneSpy = jest.spyOn(clientRepository, 'updatePhone');
    const promoterUpdatePhoneSpy = jest.spyOn(promoterRepository, 'updatePhone');
    const administratorUpdatePhoneSpy = jest.spyOn(administratorRepository, 'updatePhone');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserPhoneUseCase.execute(mockTipo, mockCpf, mockPhone);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O novo telefone não pode ser vazio!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updatePhone não foi chamado
    expect(clientUpdatePhoneSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePhone não foi chamado
    expect(promoterUpdatePhoneSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePhone não foi chamado
    expect(administratorUpdatePhoneSpy).not.toHaveBeenCalled();
  });
});