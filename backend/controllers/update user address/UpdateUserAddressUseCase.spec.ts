//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";

//Import of the EmailProvider and ApiError APIs
import { ApiError } from "../../errors/ApiError";

import { UpdateUserAddressUseCase } from "./UpdateUserAddressUseCase";


describe('UpdateUserAddressController, no data found regarding conflicts', () => {
  let updateUserAddressUseCase: UpdateUserAddressUseCase;
  let clientRepository: ClientRepository;
  let promoterRepository: PromoterRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      updateAddress: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    promoterRepository = {
      updateAddress: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as PromoterRepository;

    // Criação do serviço (UpdateUserAddressUseCase) injetando o caso de uso simulado
    updateUserAddressUseCase = new UpdateUserAddressUseCase(
      clientRepository,
      promoterRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente para cliente
  it('should call execute method of UpdateUserAddressUseCase and return a success message regarding the operation (client type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "client";
    const mockCpf = 98765432145;
    const mockCep = 12345678;
    const mockCidade = "Feira de Santana";
    const mockEstado = "Bahia";
    const mockBairro = "Campo Limpo";
    const mockRua = "Z";
    const mockNumero = 59;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateAddressSpy = jest.spyOn(clientRepository, 'updateAddress');
    const promoterUpdateAddressSpy = jest.spyOn(promoterRepository, 'updateAddress');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserAddressUseCase.execute(mockTipo, mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);

    // Verificar se o método updateAddress foi chamado com o parâmetro correto
    expect(clientUpdateAddressSpy).toHaveBeenCalledWith(mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);

    // Verificar se o método updateAddress não foi chamado
    expect(promoterUpdateAddressSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute é chamado corretamente para promoter
  it('should call execute method of UpdateUserAddressUseCase and return a success message regarding the operation (promoter type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockCep = 52341678;
    const mockCidade = "Feira de Santana";
    const mockEstado = "Bahia";
    const mockBairro = "Campo Limpo";
    const mockRua = "X";
    const mockNumero = 57;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateAddressSpy = jest.spyOn(clientRepository, 'updateAddress');
    const promoterUpdateAddressSpy = jest.spyOn(promoterRepository, 'updateAddress');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserAddressUseCase.execute(mockTipo, mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);

    // Verificar se o método updateAddress foi chamado com o parâmetro correto
    expect(clientUpdateAddressSpy).not.toHaveBeenCalled();

    // Verificar se o método updateAddress não foi chamado
    expect(promoterUpdateAddressSpy).toHaveBeenCalledWith(mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
  });

  // Teste para verificar se o método execute falha caso o novo CEP esteja vazio
  it('should call execute method of UpdateUserAddressUseCase, throw an error and NOT return a success message due to lack of new user postal code number (CEP)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockCep = 0;
    const mockCidade = "Feira de Santana";
    const mockEstado = "Bahia";
    const mockBairro = "Campo Limpo";
    const mockRua = "X";
    const mockNumero = 57;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateAddressSpy = jest.spyOn(clientRepository, 'updateAddress');
    const promoterUpdateAddressSpy = jest.spyOn(promoterRepository, 'updateAddress');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserAddressUseCase.execute(mockTipo, mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O novo CEP não pode ser vazio!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateAddress foi chamado com o parâmetro correto
    expect(clientUpdateAddressSpy).not.toHaveBeenCalled();

    // Verificar se o método updateAddress não foi chamado
    expect(promoterUpdateAddressSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso o novo nome da Cidade esteja vazio
  it('should call execute method of UpdateUserAddressUseCase, throw an error and NOT return a success message due to lack of new user city name', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockCep = 52341678;
    const mockCidade = "";
    const mockEstado = "Bahia";
    const mockBairro = "Campo Limpo";
    const mockRua = "X";
    const mockNumero = 57;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateAddressSpy = jest.spyOn(clientRepository, 'updateAddress');
    const promoterUpdateAddressSpy = jest.spyOn(promoterRepository, 'updateAddress');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserAddressUseCase.execute(mockTipo, mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O novo nome da cidade não pode ser vazio!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateAddress foi chamado com o parâmetro correto
    expect(clientUpdateAddressSpy).not.toHaveBeenCalled();

    // Verificar se o método updateAddress não foi chamado
    expect(promoterUpdateAddressSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso o novo nome do Estado esteja vazio
  it('should call execute method of UpdateUserAddressUseCase, throw an error and NOT return a success message due to lack of new user state name', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockCep = 52341678;
    const mockCidade = "Feira de Santana";
    const mockEstado = "";
    const mockBairro = "Campo Limpo";
    const mockRua = "X";
    const mockNumero = 57;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateAddressSpy = jest.spyOn(clientRepository, 'updateAddress');
    const promoterUpdateAddressSpy = jest.spyOn(promoterRepository, 'updateAddress');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserAddressUseCase.execute(mockTipo, mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O novo nome do estado não pode ser vazio!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateAddress foi chamado com o parâmetro correto
    expect(clientUpdateAddressSpy).not.toHaveBeenCalled();

    // Verificar se o método updateAddress não foi chamado
    expect(promoterUpdateAddressSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso o novo nome do Bairro esteja vazio
  it('should call execute method of UpdateUserAddressUseCase, throw an error and NOT return a success message due to lack of new user district name', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockCep = 52341678;
    const mockCidade = "Feira de Santana";
    const mockEstado = "Bahia";
    const mockBairro = "";
    const mockRua = "X";
    const mockNumero = 57;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateAddressSpy = jest.spyOn(clientRepository, 'updateAddress');
    const promoterUpdateAddressSpy = jest.spyOn(promoterRepository, 'updateAddress');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserAddressUseCase.execute(mockTipo, mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O novo nome do bairro não pode ser vazio!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateAddress foi chamado com o parâmetro correto
    expect(clientUpdateAddressSpy).not.toHaveBeenCalled();

    // Verificar se o método updateAddress não foi chamado
    expect(promoterUpdateAddressSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso o novo nome da Rua esteja vazio
  it('should call execute method of UpdateUserAddressUseCase, throw an error and NOT return a success message due to lack of new user street name', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockCep = 52341678;
    const mockCidade = "Feira de Santana";
    const mockEstado = "Bahia";
    const mockBairro = "Campo Limpo";
    const mockRua = "";
    const mockNumero = 57;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateAddressSpy = jest.spyOn(clientRepository, 'updateAddress');
    const promoterUpdateAddressSpy = jest.spyOn(promoterRepository, 'updateAddress');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserAddressUseCase.execute(mockTipo, mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O novo nome da rua não pode ser vazio!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateAddress foi chamado com o parâmetro correto
    expect(clientUpdateAddressSpy).not.toHaveBeenCalled();

    // Verificar se o método updateAddress não foi chamado
    expect(promoterUpdateAddressSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso o novo número do lagradouro esteja vazio
  it('should call execute method of UpdateUserAddressUseCase, throw an error and NOT return a success message due to lack of new user house number', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockCep = 52341678;
    const mockCidade = "Feira de Santana";
    const mockEstado = "Bahia";
    const mockBairro = "Campo Limpo";
    const mockRua = "X";
    const mockNumero = 0;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateAddressSpy = jest.spyOn(clientRepository, 'updateAddress');
    const promoterUpdateAddressSpy = jest.spyOn(promoterRepository, 'updateAddress');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserAddressUseCase.execute(mockTipo, mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O novo número do logradouro não pode ser vazio!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateAddress foi chamado com o parâmetro correto
    expect(clientUpdateAddressSpy).not.toHaveBeenCalled();

    // Verificar se o método updateAddress não foi chamado
    expect(promoterUpdateAddressSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso o tipo de usuário seja administrador
  it('should call execute method of UpdateUserAddressUseCase, throw an error and NOT return a success message due to trying to change the address of an administrator', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 88767432145;
    const mockCep = 92341678;
    const mockCidade = "Feira de Santana";
    const mockEstado = "Bahia";
    const mockBairro = "Campo Limpo";
    const mockRua = "S";
    const mockNumero = 51;
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateAddressSpy = jest.spyOn(clientRepository, 'updateAddress');
    const promoterUpdateAddressSpy = jest.spyOn(promoterRepository, 'updateAddress');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserAddressUseCase.execute(mockTipo, mockCpf, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Administradores não possuem endereço de residência em seu cadastro!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateAddress não foi chamado
    expect(clientUpdateAddressSpy).not.toHaveBeenCalled();

    // Verificar se o método updateAddress não foi chamado
    expect(promoterUpdateAddressSpy).not.toHaveBeenCalled();
  });
});