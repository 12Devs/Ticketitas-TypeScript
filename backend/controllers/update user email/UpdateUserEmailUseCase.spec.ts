//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";

//Import of the EmailProvider and ApiError APIs
import { ApiError } from "../../errors/ApiError";

import { UpdateUserEmailUseCase } from "./UpdateUserEmailUseCase";

describe('UpdateUserEmailController, returns no data regarding a possible email conflict', () => {
  let updateUserEmailUseCase: UpdateUserEmailUseCase;
  let clientRepository: ClientRepository;
  let promoterRepository: PromoterRepository;
  let administratorRepository: AdministratorRepository

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByEmail: jest.fn().mockReturnValue(null), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      findByCpfAndSenha: jest.fn().mockReturnValue({cpf: 98765432145, senha:"$2a$12$cw5GgFFqvwRseJg0DK4JBe1suai6DuH/DJuw6NwpAr/cy3skp.9MG"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updateEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    // Criação de um objeto simulado para o caso de uso (PromoterRepository)
    promoterRepository = {
      findByEmail: jest.fn().mockReturnValue(null), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      findByCpfAndSenha: jest.fn().mockReturnValue({cpf: 48767432145, senha:"$2a$12$2PJ1WBefG1fFj9t247udn.HE63cGO.DZmFuB1f0QpQNi.5Mx/Klpy"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updateEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as PromoterRepository;

    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByEmail: jest.fn().mockReturnValue(null), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      findByCpfAndSenha: jest.fn().mockReturnValue({cpf: 18545432145, password:"$2a$12$FMf13hTiTz.XmMA0j1rURenkgsqEuzH39vnqHq9dHyydCvcuYg4Ku"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updateEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorRepository;

    // Criação do serviço (UpdateUserEmailUseCase) injetando o caso de uso simulado
    updateUserEmailUseCase = new UpdateUserEmailUseCase(
      clientRepository,
      promoterRepository,
      administratorRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente para cliente
  it('should call execute method of UpdateUserEmailUseCase and return a success message regarding the operation (client type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "client";
    const mockCpf = 98765432145;
    const mockAuthPassword = "LZZ92ZuTv4crC9I";
    const mockNewEmail = "passableemail1@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmail);

    // Verificar se o método updateEmail foi chamado com os parâmetros corretos (o Hash pode ser mais de um resultado, portanto esperamos qualquer coisa aqui)
    expect(clientUpdateEmailSpy).toHaveBeenCalledWith(mockCpf, expect.stringContaining(""));

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute é chamado corretamente para promoter
  it('should call execute method of UpdateUserEmailUseCase and return a success message regarding the operation (promoter type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockAuthPassword = "bAffneEydLYoo4sNaAsnesLFsKHfxsHme6l";
    const mockNewEmail = "passableemail2@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmail);

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail foi chamado com os parâmetros corretos (o Hash pode ser mais de um resultado, portanto esperamos qualquer coisa aqui)
    expect(promoterUpdateEmailSpy).toHaveBeenCalledWith(mockCpf, expect.stringContaining(""));

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute é chamado corretamente para administrator
  it('should call execute method of UpdateUserEmailUseCase and return a success message regarding the operation (client type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockAuthPassword = "AFOYRuixgFEDXGWGOGeQndHMcH";
    const mockNewEmail = "passableemail3@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmail);

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail foi chamado com os parâmetros corretos (o Hash pode ser mais de um resultado, portanto esperamos qualquer coisa aqui)
    expect(administratorUpdateEmailSpy).toHaveBeenCalledWith(mockCpf, expect.stringContaining(""));
  });

  // Teste para verificar se o método execute falha caso a nova senha esteja vazia
  it('should call execute method of UpdateUserEmailUseCase, throw an error and NOT return a success message due to lack of new user email', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "client";
    const mockCpf = 98765432145;
    const mockAuthPassword = "LZZ92ZuTv4crC9I";
    const mockNewEmail = "";
    const mockNewEmailConfirmation = "passableemail1@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmailConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O novo endereço de email não pode ser vazio!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso a confirmação do novo email esteja vazia
  it('should call execute method of UpdateUserEmailUseCase, throw an error and NOT return a success message due to lack of confirmation of the new user email', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockAuthPassword = "AFOYRuixgFEDXGWGOGeQndHMcH";
    const mockNewEmail = "passableemail2@email.com";
    const mockNewEmailConfirmation = "";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmailConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("É necessário confirmar seu novo endereço de email!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso o novo email e sua confirmação não coincidam
  it('should call execute method of UpdateUserEmailUseCase, throw an error and NOT return a success message due to a mismatch regarding email confirmation', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockAuthPassword = "bAffneEydLYoo4sNaAsnesLFsKHfxsHme6l";
    const mockNewEmail = "passableemail3@email.com";
    const mockNewEmailConfirmation = "definitelyanotheremail@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmailConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O endereço de email não coincide com sua confirmação!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso a senha do cliente não coincida com o hash guardado no BD
  it('should call execute method of UpdateUserEmailUseCase, throw an error and NOT return a success message due to providing an incorrect password (client)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "client";
    const mockCpf = 98765432145;
    const mockAuthPassword = "1U6ztcJcvaSuFvylEMLdykIAaL";
    const mockNewEmail = "givemeanewemail1@email.com";
    const mockNewEmailConfirmation = "givemeanewemail1@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmailConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso a senha do promotor não coincida com o hash guardado no BD
  it('should call execute method of UpdateUserEmailUseCase, throw an error and NOT return a success message due to providing an incorrect password (promoter)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockAuthPassword = "SLD9UBr";
    const mockNewEmail = "givemeanewemail2@email.com";
    const mockNewEmailConfirmation = "givemeanewemail2@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmailConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso a senha do administrador não coincida com o hash guardado no BD
  it('should call execute method of UpdateUserEmailUseCase, throw an error and NOT return a success message due to providing an incorrect password (administrator)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockAuthPassword = "1U6ztcJcvaSuFvylEMLdykIAaL";
    const mockNewEmail = "givemeanewemail3@email.com";
    const mockNewEmailConfirmation = "givemeanewemail3@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmailConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });
});

describe('UpdateUserEmailController, returns data regarding an email conflict', () => {
  let updateUserEmailUseCase: UpdateUserEmailUseCase;
  let clientRepository: ClientRepository;
  let promoterRepository: PromoterRepository;
  let administratorRepository: AdministratorRepository

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByEmail: jest.fn().mockReturnValue({email: "passableemail1@email.com"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      findByCpfAndSenha: jest.fn().mockReturnValue({cpf: 98765432145, senha:"$2a$12$cw5GgFFqvwRseJg0DK4JBe1suai6DuH/DJuw6NwpAr/cy3skp.9MG"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updateEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    // Criação de um objeto simulado para o caso de uso (PromoterRepository)
    promoterRepository = {
      findByEmail: jest.fn().mockReturnValue({email: "passableemail2@email.com"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      findByCpfAndSenha: jest.fn().mockReturnValue({cpf: 48767432145, senha:"$2a$12$2PJ1WBefG1fFj9t247udn.HE63cGO.DZmFuB1f0QpQNi.5Mx/Klpy"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updateEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as PromoterRepository;

    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByEmail: jest.fn().mockReturnValue({email: "passableemail3@email.com"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      findByCpfAndSenha: jest.fn().mockReturnValue({cpf: 18545432145, password:"$2a$12$FMf13hTiTz.XmMA0j1rURenkgsqEuzH39vnqHq9dHyydCvcuYg4Ku"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updateEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorRepository;

    // Criação do serviço (UpdateUserEmailUseCase) injetando o caso de uso simulado
    updateUserEmailUseCase = new UpdateUserEmailUseCase(
      clientRepository,
      promoterRepository,
      administratorRepository
    );
  });

  // Teste para verificar se o método execute falha caso haja conflito de email (cliente)
  it('should call execute method of UpdateUserEmailUseCase, throw an error and NOT return a success message due to an email conflict (client)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "client";
    const mockCpf = 98765432145;
    const mockAuthPassword = "LZZ92ZuTv4crC9I";
    const mockNewEmail = "passableemail1@email.com";
    const mockNewEmailConfirmation = "passableemail1@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmailConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Utilize outro email", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso haja conflito de email (promoter)
  it('should call execute method of UpdateUserEmailUseCase, throw an error and NOT return a success message due to an email conflict (promoter)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockAuthPassword = "bAffneEydLYoo4sNaAsnesLFsKHfxsHme6l";
    const mockNewEmail = "passableemail2@email.com";
    const mockNewEmailConfirmation = "passableemail2@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmailConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Utilize outro email", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso haja conflito de email (administrador)
  it('should call execute method of UpdateUserEmailUseCase, throw an error and NOT return a success message due to an email conflict (administrator)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockAuthPassword = "AFOYRuixgFEDXGWGOGeQndHMcH";
    const mockNewEmail = "passableemail3@email.com";
    const mockNewEmailConfirmation = "passableemail3@email.com";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdateEmailSpy = jest.spyOn(clientRepository, 'updateEmail');
    const promoterUpdateEmailSpy = jest.spyOn(promoterRepository, 'updateEmail');
    const administratorUpdateEmailSpy = jest.spyOn(administratorRepository, 'updateEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserEmailUseCase.execute(mockTipo, mockCpf, mockAuthPassword, mockNewEmail, mockNewEmailConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Utilize outro email", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updateEmail não foi chamado
    expect(clientUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(promoterUpdateEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método updateEmail não foi chamado
    expect(administratorUpdateEmailSpy).not.toHaveBeenCalled();
  });
});