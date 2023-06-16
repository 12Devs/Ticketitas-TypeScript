//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";

//Import of the EmailProvider and ApiError APIs
import { EmailProvider } from "../../utils/EmailProvider";
import { ApiError } from "../../errors/ApiError";

import { CreateClientUseCase } from "./CreateClientUseCase";

describe('CreateClientController, no data found regarding conflicts', () => {
  let createClientUseCase: CreateClientUseCase;
  let clientRepository:  ClientRepository;
  let emailProvider: EmailProvider;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)
    clientRepository = {
      findByCpf: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      findByEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    emailProvider = {
      sendEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EmailProvider;

    // Criação do serviço (CreateClientUseCase) injetando o caso de uso simulado
    createClientUseCase = new CreateClientUseCase(
      clientRepository,
      emailProvider
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of CreateClientUseCase and return client creation info', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockName = "Nome Aleatorio";
    const mockCpf = 76425315459;
    const mockEmail = "youknownothing@email.com";
    const mockPhone = 75991234567;
    const mockPassword = "thisisatestpw54665"
    const mockPasswordConfirmation = "thisisatestpw54665"
    const mockCep = 65676289
    const mockCidade = "Feirinha de Santaninha"
    const mockEstado = "Bahia"
    const mockBairro = "Fim de Mundo"
    const mockRua = "Rua XYZ"
    const mockNumero = 420
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const findByCpfSpy = jest.spyOn(clientRepository, 'findByCpf');
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientRepository, 'create');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const mockResponse = await createClientUseCase.execute(mockName, mockCpf, mockEmail, mockPhone, mockPassword, mockPasswordConfirmation, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);

    // Verificar se o método findByCpf foi chamado com o parâmetro correto
    expect(findByCpfSpy).toHaveBeenCalledWith(76425315459);

    // Verificar se o método findByEmail foi chamado com o parâmetro correto
    expect(findByEmailSpy).toHaveBeenCalledWith("youknownothing@email.com");

    // Verificar se o método create foi chamado com os parâmetros corretos (senha fica expect.stringContaining("") já que o hash pode variar)
    expect(createSpy).toHaveBeenCalledWith(mockName, mockCpf, mockEmail, mockPhone, expect.stringContaining(""), mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);

    // Criação de um objeto simulado para o email de resposta
    const mockEmailInfo = {
      template: 'RegistrationConfirmationClient',
      subject: `Bem-vindo à Ticketitas!`
    };

    // Verificar se o método sendEmail foi chamado com os parâmetros corretos
    expect(sendEmailSpy).toHaveBeenCalledWith("youknownothing@email.com", mockEmailInfo);

    // Verificar se o a criação foi bem-sucedida por meio de verificação do return
    expect(mockResponse.newClient).not.toBe(null);
  });

  // Teste para observar se a verificação de nome (não pode estar vazio) é feita corretamente
  it('should call execute method of CreateClientUseCase, throw a custom error and not return any client creation info, as the name is empty', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockName = "";
    const mockCpf = 76425315459;
    const mockEmail = "youknownothing@email.com";
    const mockPhone = 75991234567;
    const mockPassword = "thisisatestpw54665"
    const mockPasswordConfirmation = "thisisatestpw54665"
    const mockCep = 65676289
    const mockCidade = "Feirinha de Santaninha"
    const mockEstado = "Bahia"
    const mockBairro = "Fim de Mundo"
    const mockRua = "Rua XYZ"
    const mockNumero = 420
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByCpfSpy = jest.spyOn(clientRepository, 'findByCpf');
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientRepository, 'create');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await createClientUseCase.execute(mockName, mockCpf, mockEmail, mockPhone, mockPassword, mockPasswordConfirmation, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O nome é obrigatório!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCpf não foi chamado
    expect(findByCpfSpy).not.toHaveBeenCalled();

    // Verificar se o método findByEmail não foi chamado
    expect(findByEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método sendEmail não foi chamado
    expect(sendEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para observar se a verificação de cpf (não pode estar vazio) é feita corretamente
  it('should call execute method of CreateClientUseCase, throw a custom error and not return any client creation info, as the cpf number is empty', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockName = "Nome Aleatorio";
    const mockCpf = 0;
    const mockEmail = "youknownothing@email.com";
    const mockPhone = 75991234567;
    const mockPassword = "thisisatestpw54665"
    const mockPasswordConfirmation = "thisisatestpw54665"
    const mockCep = 65676289
    const mockCidade = "Feirinha de Santaninha"
    const mockEstado = "Bahia"
    const mockBairro = "Fim de Mundo"
    const mockRua = "Rua XYZ"
    const mockNumero = 420
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByCpfSpy = jest.spyOn(clientRepository, 'findByCpf');
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientRepository, 'create');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await createClientUseCase.execute(mockName, mockCpf, mockEmail, mockPhone, mockPassword, mockPasswordConfirmation, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O cpf é obrigatório!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCpf não foi chamado
    expect(findByCpfSpy).not.toHaveBeenCalled();

    // Verificar se o método findByEmail não foi chamado
    expect(findByEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método sendEmail não foi chamado
    expect(sendEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para observar se a verificação de email (não pode estar vazio) é feita corretamente
  it('should call execute method of CreateClientUseCase, throw a custom error and not return any client creation info, as the e-mail address is empty', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockName = "Nome Aleatorio";
    const mockCpf = 76425315459;
    const mockEmail = "";
    const mockPhone = 75991234567;
    const mockPassword = "thisisatestpw54665"
    const mockPasswordConfirmation = "thisisatestpw54665"
    const mockCep = 65676289
    const mockCidade = "Feirinha de Santaninha"
    const mockEstado = "Bahia"
    const mockBairro = "Fim de Mundo"
    const mockRua = "Rua XYZ"
    const mockNumero = 420
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByCpfSpy = jest.spyOn(clientRepository, 'findByCpf');
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientRepository, 'create');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await createClientUseCase.execute(mockName, mockCpf, mockEmail, mockPhone, mockPassword, mockPasswordConfirmation, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O email é obrigatório!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCpf não foi chamado
    expect(findByCpfSpy).not.toHaveBeenCalled();

    // Verificar se o método findByEmail não foi chamado
    expect(findByEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método sendEmail não foi chamado
    expect(sendEmailSpy).not.toHaveBeenCalled();
  });

  // Teste para observar se a verificação de telefone (não pode estar vazio) é feita corretamente
  it('should call execute method of CreateClientUseCase, throw a custom error and not return any client creation info, as the phone number is empty', async () => {

    // Criação de objetos simulado para a requisição
    const mockName = "Nome Aleatorio";
    const mockCpf = 76425315459;
    const mockEmail = "youknownothing@email.com";
    const mockPhone = 0;
    const mockPassword = "thisisatestpw54665"
    const mockPasswordConfirmation = "thisisatestpw54665"
    const mockCep = 65676289
    const mockCidade = "Feirinha de Santaninha"
    const mockEstado = "Bahia"
    const mockBairro = "Fim de Mundo"
    const mockRua = "Rua XYZ"
    const mockNumero = 420
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByCpfSpy = jest.spyOn(clientRepository, 'findByCpf');
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientRepository, 'create');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await createClientUseCase.execute(mockName, mockCpf, mockEmail, mockPhone, mockPassword, mockPasswordConfirmation, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O telefone é obrigatório!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCpf não foi chamado
    expect(findByCpfSpy).not.toHaveBeenCalled();

    // Verificar se o método findByEmail não foi chamado
    expect(findByEmailSpy).not.toHaveBeenCalled();

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método sendEmail não foi chamado
    expect(sendEmailSpy).not.toHaveBeenCalled();
  });
});

describe('CreateClientController, conflicting cpf number is found', () => {
  let createClientUseCase: CreateClientUseCase;
  let clientRepository:  ClientRepository;
  let emailProvider: EmailProvider;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)
    clientRepository = {
      findByCpf: jest.fn().mockReturnValue({cpf: 86419315459}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabecer um retorno padrão para cada chamada da função simulada
      findByEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    emailProvider = {
      sendEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EmailProvider;

    // Criação do serviço (CreateClientUseCase) injetando o caso de uso simulado
    createClientUseCase = new CreateClientUseCase(
      clientRepository,
      emailProvider
    );
  });

  // Teste para observar se a verificação de conflito de cpf é feita corretamente
  it('should call execute method of CreateClientUseCase, throw a custom error and not return any client creation info, as there is a conflict regarding cpf numbers', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockName = "Nome Aleatorio";
    const mockCpf = 76425315459;
    const mockEmail = "youknownothing@email.com";
    const mockPhone = 75991234567;
    const mockPassword = "thisisatestpw54665"
    const mockPasswordConfirmation = "thisisatestpw54665"
    const mockCep = 65676289
    const mockCidade = "Feirinha de Santaninha"
    const mockEstado = "Bahia"
    const mockBairro = "Fim de Mundo"
    const mockRua = "Rua XYZ"
    const mockNumero = 420
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByCpfSpy = jest.spyOn(clientRepository, 'findByCpf');
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientRepository, 'create');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await createClientUseCase.execute(mockName, mockCpf, mockEmail, mockPhone, mockPassword, mockPasswordConfirmation, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Utilize outro cpf", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCpf foi chamado com o parâmetro correto
    expect(findByCpfSpy).toHaveBeenCalledWith(mockCpf);

    // Verificar se o método findByEmail foi chamado com o parâmetro correto
    expect(findByEmailSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método sendEmail não foi chamado
    expect(sendEmailSpy).not.toHaveBeenCalled();
  });
});

describe('CreateClientController, conflicting e-mail address is found', () => {
  let createClientUseCase: CreateClientUseCase;
  let clientRepository:  ClientRepository;
  let emailProvider: EmailProvider;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AprovePromoterRegistrationUseCase)
    clientRepository = {
      findByCpf: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
      findByEmail: jest.fn().mockReturnValue({cpf: 86419315459}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabecer um retorno padrão para cada chamada da função simulada
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    emailProvider = {
      sendEmail: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as EmailProvider;

    // Criação do serviço (CreateClientUseCase) injetando o caso de uso simulado
    createClientUseCase = new CreateClientUseCase(
      clientRepository,
      emailProvider
    );
  });

  // Teste para observar se a verificação de conflito de email é feita corretamente
  it('should call execute method of CreateClientUseCase, throw a custom error and not return any client creation info, as there is a conflict regarding cpf numbers', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockName = "Nome Aleatorio";
    const mockCpf = 76425315459;
    const mockEmail = "youknownothing@email.com";
    const mockPhone = 75991234567;
    const mockPassword = "thisisatestpw54665"
    const mockPasswordConfirmation = "thisisatestpw54665"
    const mockCep = 65676289
    const mockCidade = "Feirinha de Santaninha"
    const mockEstado = "Bahia"
    const mockBairro = "Fim de Mundo"
    const mockRua = "Rua XYZ"
    const mockNumero = 420
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByCpfSpy = jest.spyOn(clientRepository, 'findByCpf');
    const findByEmailSpy = jest.spyOn(clientRepository, 'findByEmail');
    const createSpy = jest.spyOn(clientRepository, 'create');
    const sendEmailSpy = jest.spyOn(emailProvider, 'sendEmail');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await createClientUseCase.execute(mockName, mockCpf, mockEmail, mockPhone, mockPassword, mockPasswordConfirmation, mockCep, mockCidade, mockEstado, mockBairro, mockRua, mockNumero);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Utilize outro email", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCpf foi chamado com o parâmetro correto
    expect(findByCpfSpy).toHaveBeenCalledWith(mockCpf);

    // Verificar se o método findByEmail foi chamado com o parâmetro correto
    expect(findByEmailSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();

    // Verificar se o método sendEmail não foi chamado
    expect(sendEmailSpy).not.toHaveBeenCalled();
  });
});