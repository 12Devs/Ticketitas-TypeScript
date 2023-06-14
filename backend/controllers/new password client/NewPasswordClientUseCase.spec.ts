//Import of the repository classes
import { ClientPasswordChangeCodeRepository } from "../../db/ClientPasswordChangeCodeRepository";
import { ClientRepository } from "../../db/ClientRepository";

//Import of the ApiError API
import { ApiError } from "../../errors/ApiError";

//Import of the class that will be tested here
import { NewPasswordClientUseCase } from "./NewPasswordClientUseCase";

describe('NewPasswordClientController, the code provided by the user is registered in the database', () => {
  let newPasswordClientUseCase: NewPasswordClientUseCase;
  let clientRepository:  ClientRepository;
  let clientPasswordChangeCodeRepository: ClientPasswordChangeCodeRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      updatePassword: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    clientPasswordChangeCodeRepository = {
      findByCode: jest.fn().mockReturnValue({code: "LCJMgoZ4KYZOSWc9qDYiZF6slwP2jGGq", cpf: 51398139618}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorn o padrão para a função simulada
      destroyByCode: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientPasswordChangeCodeRepository;

    // Criação do serviço (NewPasswordClientUseCase) injetando o caso de uso simulado
    newPasswordClientUseCase = new NewPasswordClientUseCase(
      clientRepository,
      clientPasswordChangeCodeRepository
    );
  });

  // Teste para verificar se o método updatePassword é chamado corretamente quando tudo está nos conformes
  it('should call execute method of NewPasswordClientUseCase and return a message saying that the operation was successful', async () => {
    // Criação de um objeto simulado para o caso de uso (ClientPasswordChangeCodeRepository)
    
    // Criação de objetos simulados para a requisição
    const mockCpf = 51398139618;
    const mockPassword = "G7qnXDEtc0pZBPYJvdwEmLL";
    const mockCode = "LCJMgoZ4KYZOSWc9qDYiZF6slwP2jGGq";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'findByCode');
    const updatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const destroyByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'destroyByCode');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await newPasswordClientUseCase.execute(mockCode, mockPassword, mockPassword);

    // Verificar se o método findByCode foi chamado com o parâmetro correto
    expect(findByCodeSpy).toHaveBeenCalledWith(mockCode);

    // Verificar se o método updatePassword foi chamado com os parâmetros corretos (precisa de expect.anything na medidade em que o Hash de uma string pode variar)
    expect(updatePasswordSpy).toHaveBeenCalledWith(mockCpf, expect.anything());

    // Verificar se o método destroyByCode foi chamado com os parâmetros corretos
    expect(destroyByCodeSpy).toHaveBeenCalledWith(mockCode);
  });

  // Teste para verificar se o método execute retorna erro caso o campo de nova senha esteja vazio
  it('should call execute method of NewPasswordClientUseCase, throw an error and not return any success message', async () => {
    // Criação de um objeto simulado para o caso de uso (ClientPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockPassword = "";
    const mockPasswordConfirmation = "G7qnXDEtc0pZBPYJvdwEmLL";
    const mockCode = "LCJMgoZ4KYZOSWc9qDYiZF6slwP2jGGq";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'findByCode');
    const updatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const destroyByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'destroyByCode');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await newPasswordClientUseCase.execute(mockCode, mockPassword, mockPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("A nova senha não pode ser vazia!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCode não foi chamado
    expect(findByCodeSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(updatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método destroyByCode não foi chamado
    expect(destroyByCodeSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute retorna erro caso o campo de confirmação da nova senha esteja vazio
  it('should call execute method of NewPasswordClientUseCase, throw an error and not return any success message', async () => {
    // Criação de um objeto simulado para o caso de uso (ClientPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockPassword = "G7qnXDEtc0pZBPYJvdwEmLL";
    const mockPasswordConfirmation = "";
    const mockCode = "LCJMgoZ4KYZOSWc9qDYiZF6slwP2jGGq";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'findByCode');
    const updatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const destroyByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'destroyByCode');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await newPasswordClientUseCase.execute(mockCode, mockPassword, mockPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("A confirmação da nova senha não pode ser vazia!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCode não foi chamado
    expect(findByCodeSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(updatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método destroyByCode não foi chamado
    expect(destroyByCodeSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute retorna erro caso as senhas não coincidam
  it('should call execute method of NewPasswordClientUseCase, throw an error and not return any success message', async () => {
    // Criação de um objeto simulado para o caso de uso (ClientPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockPassword = "G7qnXDEtc0pZBPYJvdwEmLL";
    const mockPasswordConfirmation = "thtC0Awq2zaGohiBel3w";
    const mockCode = "LCJMgoZ4KYZOSWc9qDYiZF6slwP2jGGq";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'findByCode');
    const updatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const destroyByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'destroyByCode');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await newPasswordClientUseCase.execute(mockCode, mockPassword, mockPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("As senhas nao coincidem!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCode não foi chamado
    expect(findByCodeSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(updatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método destroyByCode não foi chamado
    expect(destroyByCodeSpy).not.toHaveBeenCalled();
  });
});

describe('NewPasswordClientController, the code provided by the user is NOT registered in the database', () => {
  let newPasswordClientUseCase: NewPasswordClientUseCase;
  let clientRepository:  ClientRepository;
  let clientPasswordChangeCodeRepository: ClientPasswordChangeCodeRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      updatePassword: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    clientPasswordChangeCodeRepository = {
      findByCode: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      destroyByCode: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientPasswordChangeCodeRepository;

    // Criação do serviço (NewPasswordClientUseCase) injetando o caso de uso simulado
    newPasswordClientUseCase = new NewPasswordClientUseCase(
      clientRepository,
      clientPasswordChangeCodeRepository
    );
  });

  // Teste para verificar se o método execute retorna erro caso as senhas não coincidam
  it('should call execute method of NewPasswordClientUseCase, throw an error and not return any success message', async () => {
    // Criação de um objeto simulado para o caso de uso (ClientPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockPassword = "G7qnXDEtc0pZBPYJvdwEmLL";
    const mockPasswordConfirmation = "G7qnXDEtc0pZBPYJvdwEmLL";
    const mockCode = "LCJMgoZ4KYZOSWc9qDYiZF6slwP2jGGq";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'findByCode');
    const updatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const destroyByCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'destroyByCode');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      const mockReturn = await newPasswordClientUseCase.execute(mockCode, mockPassword, mockPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Codigo de mudanca de senha invalido!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCode foi chamado com o parâmetro correto
    expect(findByCodeSpy).toHaveBeenCalledWith(mockCode);

    // Verificar se o método updatePassword não foi chamado
    expect(updatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método destroyByCode não foi chamado
    expect(destroyByCodeSpy).not.toHaveBeenCalled();
  });
});