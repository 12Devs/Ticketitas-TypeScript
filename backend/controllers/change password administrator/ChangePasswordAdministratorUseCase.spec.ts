//Import of the repository classes
import { AdministratorPasswordChangeCodeRepository } from "../../db/AdministratorPasswordChangeCodeRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";

//Import of the ApiError API
import { ApiError } from "../../errors/ApiError";
import { EmailProvider } from "../../utils/EmailProvider";

//Import of the class that will be tested here
import { ChangePasswordAdministratorUseCase } from "./ChangePasswordAdministratorUseCase";

describe('ChangePasswordAdministratorController, no code stored', () => {
  let changePasswordAdministratorUseCase: ChangePasswordAdministratorUseCase;
  let administratorRepository:  AdministratorRepository;
  let administratorPasswordChangeCodeRepository: AdministratorPasswordChangeCodeRepository;
  let emailProvider: EmailProvider;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByEmail: jest.fn().mockReturnValue({ cpf: 84586545345}), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue para estabelecer um valor padrao para o retorno da funcao simulada
    } as unknown as AdministratorRepository;

    administratorPasswordChangeCodeRepository = {
      generateUniqueCode: jest.fn().mockReturnValue("hf7rji7ghftrmnv94j6dnkt7fnvyrn2k"), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue() para estabelecer um retorno padrao para a funcao simulada
      findByCpf: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      updateCode: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorPasswordChangeCodeRepository;

    emailProvider = {
      sendEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EmailProvider;

    // Criação do serviço (ChangePasswordAdministratorUseCase) injetando o caso de uso simulado
    changePasswordAdministratorUseCase = new ChangePasswordAdministratorUseCase(
      administratorRepository,
      administratorPasswordChangeCodeRepository,
      emailProvider
    );
  });

  // Teste para verificar se o método execute é chamado corretamente quando ainda nao existe outro codigo guardado
  it('should call execute method of ChangePasswordAdministratorUseCase and return administrator password change info', async () => {
    // Criação de um objeto simulado para o caso de uso (AdministratorPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockEmail = "youknownothing@email.com";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailSpy = jest.spyOn(administratorRepository, 'findByEmail');
    const createSpy = jest.spyOn(administratorPasswordChangeCodeRepository, 'create');
    const updateCodeSpy = jest.spyOn(administratorPasswordChangeCodeRepository, 'updateCode');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const mockReturn = await changePasswordAdministratorUseCase.execute(mockEmail);

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create foi chamado com os parâmetros corretos
    expect(createSpy).toHaveBeenCalledWith("hf7rji7ghftrmnv94j6dnkt7fnvyrn2k", 84586545345);

    // Verificar se o método updateCodeSpy foi chamado com os parâmetros corretos
    expect(updateCodeSpy).not.toHaveBeenCalled();

    // Verificar se o a criação foi bem-sucedida por meio de verificação do return
    expect(mockReturn.resetAdministratorPassword).not.toBe(null);

    // Verificar se o email foi enviado
    expect(sendEmailSpy).toHaveBeenCalled()
  });

  // Teste para verificar se o método execute é retorna erro caso o campo de emai esteja vazio
  it('should call execute method of ChangePasswordAdministratorUseCase, throw an error and not return any administrator password change info', async () => {
    // Criação de um objeto simulado para o caso de uso (AdministratorPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockEmail = "";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailSpy = jest.spyOn(administratorRepository, 'findByEmail');
    const createSpy = jest.spyOn(administratorPasswordChangeCodeRepository, 'create');
    const updateCodeSpy = jest.spyOn(administratorPasswordChangeCodeRepository, 'updateCode');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await changePasswordAdministratorUseCase.execute(mockEmail);
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

    // Verificar se o email não foi enviado
    expect(sendEmailSpy).not.toHaveBeenCalled()
  });
});

describe('ChangePasswordAdministratorController, code already stored', () => {
  let changePasswordAdministratorUseCase: ChangePasswordAdministratorUseCase;
  let administratorRepository:  AdministratorRepository;
  let administratorPasswordChangeCodeRepository: AdministratorPasswordChangeCodeRepository;
  let emailProvider: EmailProvider;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByEmail: jest.fn().mockReturnValue({ cpf: 84586545345}), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue para estabelecer um valor padrao para o retorno da funcao simulada
    } as unknown as AdministratorRepository;

    administratorPasswordChangeCodeRepository = {
      generateUniqueCode: jest.fn().mockReturnValue("hf7rji7ghftrmnv94j6dnkt7fnvyrn2k"), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue() para estabelecer um retorno padrao para a funcao simulada
      findByCpf: jest.fn().mockReturnValue({cpf: 84586545345, code: "op7rji7ghyermnv94j6dnkt7fnvyrn2k"}), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue() para estabelecer um retorno padrao para a funcao simulada
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      updateCode: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorPasswordChangeCodeRepository;

    emailProvider = {
      sendEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EmailProvider;

    // Criação do serviço (ChangePasswordAdministratorUseCase) injetando o caso de uso simulado
    changePasswordAdministratorUseCase = new ChangePasswordAdministratorUseCase(
      administratorRepository,
      administratorPasswordChangeCodeRepository,
      emailProvider
    );
  });

  // Teste para verificar se o método execute é chamado corretamente quando já existe código guardado
  it('should call execute method of ChangePasswordAdministratorUseCase and return administrator password change info', async () => {
    // Criação de um objeto simulado para o caso de uso (AdministratorPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockEmail = "youknownothing@email.com";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailSpy = jest.spyOn(administratorRepository, 'findByEmail');
    const createSpy = jest.spyOn(administratorPasswordChangeCodeRepository, 'create');
    const updateCodeSpy = jest.spyOn(administratorPasswordChangeCodeRepository, 'updateCode');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const mockReturn = await changePasswordAdministratorUseCase.execute(mockEmail);

    // Verificar se o método findByEmail foi chamado com o parâmetro correto
    expect(findByEmailSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create foi chamado com os parâmetros corretos
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método updateCodeSpy foi chamado com os parâmetros corretos
    expect(updateCodeSpy).toHaveBeenCalledWith("op7rji7ghyermnv94j6dnkt7fnvyrn2k","hf7rji7ghftrmnv94j6dnkt7fnvyrn2k");

    // Verificar se o a criação foi bem-sucedida por meio de verificação do return
    expect(mockReturn.resetAdministratorPassword).not.toBe(null);

    // Verificar se o email foi enviado
    expect(sendEmailSpy).toHaveBeenCalled()
  });
});


describe('ChangePasswordAdministratorController, no code stored', () => {
  let changePasswordAdministratorUseCase: ChangePasswordAdministratorUseCase;
  let administratorRepository:  AdministratorRepository;
  let administratorPasswordChangeCodeRepository: AdministratorPasswordChangeCodeRepository;
  let emailProvider: EmailProvider;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue para estabelecer um valor padrao para o retorno da funcao simulada
    } as unknown as AdministratorRepository;

    administratorPasswordChangeCodeRepository = {
      generateUniqueCode: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada e mockReturnValue() para estabelecer um retorno padrao para a funcao simulada
      findByCpf: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      updateCode: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorPasswordChangeCodeRepository;

    emailProvider = {
      sendEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EmailProvider;

    // Criação do serviço (ChangePasswordAdministratorUseCase) injetando o caso de uso simulado
    changePasswordAdministratorUseCase = new ChangePasswordAdministratorUseCase(
      administratorRepository,
      administratorPasswordChangeCodeRepository,
      emailProvider
    );
  });

  // Teste para verificar se o método execute é chamado corretamente quando ainda nao existe outro codigo guardado
  it('should call execute method of ChangePasswordAdministratorUseCase and return administrator password change info', async () => {
    // Criação de um objeto simulado para o caso de uso (AdministratorPasswordChangeCodeRepository)

    // Criação de objetos simulados para a requisição
    const mockEmail = "youknownothing@email.com";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailSpy = jest.spyOn(administratorRepository, 'findByEmail');
    const createSpy = jest.spyOn(administratorPasswordChangeCodeRepository, 'create');
    const updateCodeSpy = jest.spyOn(administratorPasswordChangeCodeRepository, 'updateCode');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await changePasswordAdministratorUseCase.execute(mockEmail);
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

    // Verificar se o email não foi enviado
    expect(sendEmailSpy).not.toHaveBeenCalled()
  });
});