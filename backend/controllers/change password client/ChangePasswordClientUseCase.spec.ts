//Import of the repository classes
import { ClientPasswordChangeCodeRepository } from "../../db/ClientPasswordChangeCodeRepository";
import { ClientRepository } from "../../db/ClientRepository";

//Import of the ApiError API
import { ApiError } from "../../errors/ApiError";
import { SendEmail } from "../../utils/SendEmail";

//Import of the class that will be tested here
import { ChangePasswordClientUseCase } from "./ChangePasswordClientUseCase";

describe('ChangePasswordClientController, no code stored', () => {
  let changePasswordClientUseCase: ChangePasswordClientUseCase;
  let clientRepository:  ClientRepository;
  let clientPasswordChangeCodeRepository: ClientPasswordChangeCodeRepository;
  let sendEmail: SendEmail;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByEmail: jest.fn().mockReturnValue({ cpf: 84586545345}), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue para estabelecer um valor padrao para o retorno da funcao simulada
    } as unknown as ClientRepository;

    clientPasswordChangeCodeRepository = {
      generateUniqueCode: jest.fn().mockReturnValue("hf7rji7ghftrmnv94j6dnkt7fnvyrn2k"), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue() para estabelecer um retorno padrao para a funcao simulada
      findByCpf: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      updateCode: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientPasswordChangeCodeRepository;

    // Criação do serviço (ChangePasswordClientUseCase) injetando o caso de uso simulado
    changePasswordClientUseCase = new ChangePasswordClientUseCase(
      clientRepository,
      clientPasswordChangeCodeRepository,
      sendEmail
    );
  });

  // Teste para verificar se o método execute é chamado corretamente quando ainda nao existe outro codigo guardado
  it('should call execute method of ChangePasswordClientUseCase and return client password change info', async () => {
    // Criação de um objeto simulado para o caso de uso (ClientPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockEmail = "youknownothing@email.com";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'create');
    const updateCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'updateCode');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const mockReturn = await changePasswordClientUseCase.execute(mockEmail);

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create foi chamado com os parâmetros corretos
    expect(createSpy).toHaveBeenCalledWith("hf7rji7ghftrmnv94j6dnkt7fnvyrn2k", 84586545345);

    // Verificar se o método updateCodeSpy foi chamado com os parâmetros corretos
    expect(updateCodeSpy).not.toHaveBeenCalled();

    // Verificar se o a criação foi bem-sucedida por meio de verificação do return
    expect(mockReturn.resetClientPassword).not.toBe(null);
  });

  // Teste para verificar se o método execute é retorna erro caso o campo de emai esteja vazio
  it('should call execute method of ChangePasswordClientUseCase, throw an error and not return any client password change info', async () => {
    // Criação de um objeto simulado para o caso de uso (ClientPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockEmail = "";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'create');
    const updateCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'updateCode');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await changePasswordClientUseCase.execute(mockEmail);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Insira um endereco de email!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByEmail não foi chamado
    expect(findByEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método updateCodeSpy não foi chamado
    expect(updateCodeSpy).not.toHaveBeenCalled();
  });
});

describe('ChangePasswordClientController, code already stored', () => {
  let changePasswordClientUseCase: ChangePasswordClientUseCase;
  let clientRepository:  ClientRepository;
  let clientPasswordChangeCodeRepository: ClientPasswordChangeCodeRepository;
  let sendEmail: SendEmail;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByEmail: jest.fn().mockReturnValue({ cpf: 84586545345}), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue para estabelecer um valor padrao para o retorno da funcao simulada
    } as unknown as ClientRepository;

    clientPasswordChangeCodeRepository = {
      generateUniqueCode: jest.fn().mockReturnValue("hf7rji7ghftrmnv94j6dnkt7fnvyrn2k"), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue() para estabelecer um retorno padrao para a funcao simulada
      findByCpf: jest.fn().mockReturnValue({cpf: 84586545345, code: "op7rji7ghyermnv94j6dnkt7fnvyrn2k"}), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue() para estabelecer um retorno padrao para a funcao simulada
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      updateCode: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientPasswordChangeCodeRepository;

    // Criação do serviço (ChangePasswordClientUseCase) injetando o caso de uso simulado
    changePasswordClientUseCase = new ChangePasswordClientUseCase(
      clientRepository,
      clientPasswordChangeCodeRepository,
      sendEmail
    );
  });

  // Teste para verificar se o método execute é chamado corretamente quando já existe código guardado
  it('should call execute method of ChangePasswordClientUseCase and return client password change info', async () => {
    // Criação de um objeto simulado para o caso de uso (ClientPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockEmail = "youknownothing@email.com";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'create');
    const updateCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'updateCode');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const mockReturn = await changePasswordClientUseCase.execute(mockEmail);

    // Verificar se o método findByEmail foi chamado com o parâmetro correto
    expect(findByEmailSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create foi chamado com os parâmetros corretos
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método updateCodeSpy foi chamado com os parâmetros corretos
    expect(updateCodeSpy).toHaveBeenCalledWith("op7rji7ghyermnv94j6dnkt7fnvyrn2k","hf7rji7ghftrmnv94j6dnkt7fnvyrn2k");

    // Verificar se o a criação foi bem-sucedida por meio de verificação do return
    expect(mockReturn.resetClientPassword).not.toBe(null);
  });
});


describe('ChangePasswordClientController, no code stored', () => {
  let changePasswordClientUseCase: ChangePasswordClientUseCase;
  let clientRepository:  ClientRepository;
  let clientPasswordChangeCodeRepository: ClientPasswordChangeCodeRepository;
  let sendEmail: SendEmail;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue para estabelecer um valor padrao para o retorno da funcao simulada
    } as unknown as ClientRepository;

    clientPasswordChangeCodeRepository = {
      generateUniqueCode: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue() para estabelecer um retorno padrao para a funcao simulada
      findByCpf: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      updateCode: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientPasswordChangeCodeRepository;

    // Criação do serviço (ChangePasswordClientUseCase) injetando o caso de uso simulado
    changePasswordClientUseCase = new ChangePasswordClientUseCase(
      clientRepository,
      clientPasswordChangeCodeRepository,
      sendEmail
    );
  });

  // Teste para verificar se o método execute é chamado corretamente quando ainda nao existe outro codigo guardado
  it('should call execute method of ChangePasswordClientUseCase and return client password change info', async () => {
    // Criação de um objeto simulado para o caso de uso (ClientPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockEmail = "youknownothing@email.com";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'create');
    const updateCodeSpy = jest.spyOn(clientPasswordChangeCodeRepository, 'updateCode');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await changePasswordClientUseCase.execute(mockEmail);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Endereco de e-mail nao consta no sistema!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByEmail foi chamado com o parâmetro correto
    expect(findByEmailSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método updateCodeSpy não foi chamado
    expect(updateCodeSpy).not.toHaveBeenCalled();
  });
});