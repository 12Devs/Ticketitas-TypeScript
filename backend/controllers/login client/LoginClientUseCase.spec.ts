//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { TokenClientRepository } from "../../db/TokenClientRepository";

//Import of the ApiError API
import { ApiError } from "../../errors/ApiError";

//Import of the class that will be tested here
import { LoginClientUseCase } from "./LoginClientUseCase";

describe('LoginClientController, returns info when the DB is asked for the existence of an user with a certain email address', () => {
  let loginClientUseCase: LoginClientUseCase;
  let clientRepository:  ClientRepository;
  let tokenClientRepository: TokenClientRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByEmailAndSenha: jest.fn().mockReturnValue({ nome: "Outro Nome Sem Importacia", cpf: 84586545345, email: "youknownothing@email.com", senha: "$2a$12$bFpND0cLaRrLDeaUq6qaf.saPTA3TyUJHmem/ECHhw29r/peM/4n6"}), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    // Criação de um objeto simulado para o caso de uso (TokenClientRepository)
    tokenClientRepository = {
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as TokenClientRepository;

    // Criação do serviço (LoginClientUseCase) injetando o caso de uso simulado
    loginClientUseCase = new LoginClientUseCase(
      clientRepository,
      tokenClientRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of LoginClientUseCase and return client login info', async () => {
    
    // Criação de objetos simulados para a requisição
    const mockEmail = "youknownothing@email.com";
    const mockPassword = "YeTaNoThErPW987";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailAndSenhaSpy = jest.spyOn(clientRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenClientRepository, 'create');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const mockReturn = await loginClientUseCase.execute(mockEmail, mockPassword);

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailAndSenhaSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create foi chamado com o parâmetro correto
    //Infelizmente, o modulo jsonwebtoken nao tem muito suporte para mocking, porem ainda podemos conferir o cpf correto sendo passado para a funcao que cria o token.
    expect(createSpy).toHaveBeenCalledWith(84586545345, expect.anything(), expect.anything());

    // Verificar se o a criação foi bem-sucedida por meio de verificação do return
    expect(mockReturn.client).not.toBe(null);
  });

  // Teste para observar se a verificação de email (não pode estar vazio) é feita corretamente
  it('should call execute method of LoginClientUseCase, throw a custom error and not return any client login info, as the email is empty', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEmail = "";
    const mockPassword = "YeTaNoThErPW987";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByEmailAndSenhaSpy = jest.spyOn(clientRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenClientRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginClientUseCase.execute(mockEmail, mockPassword);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("O email é obrigatório", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCpf não foi chamado
    expect(findByEmailAndSenhaSpy).not.toHaveBeenCalled();

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();
  });

  // Teste para observar se a verificação de senha (não pode estar vazio) é feita corretamente
  it('should call execute method of LoginClientUseCase, throw a custom error and not return any client login info, as the password is empty', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEmail = "youknownothing@email.com";
    const mockPassword = "";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByEmailAndSenhaSpy = jest.spyOn(clientRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenClientRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginClientUseCase.execute(mockEmail, mockPassword);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("A senha é obrigatória", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByCpf não foi chamado
    expect(findByEmailAndSenhaSpy).not.toHaveBeenCalled();

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();
  });

  // Teste para observar se uma senha que não coincide com o hash armazenado no BD resulta em falha no login
  it('should call execute method of LoginClientUseCase, throw a custom error and not return any client login info, as the password is incorrect', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEmail = "youknownothing@email.com";
    const mockPassword = "thisIsIndeedIncorrect498587";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se foram chamados (ou não)
    const findByEmailAndSenhaSpy = jest.spyOn(clientRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenClientRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginClientUseCase.execute(mockEmail, mockPassword);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Email ou senha incorretos", 401);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailAndSenhaSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();
  });

  // Teste para observar se um erro na coincidência de e-mail resulta em falha do login (tecnicamente impossível, mas quem desenhou este UseCase preferiu assim verifica-lo)
  it('should call execute method of LoginClientUseCase, throw a custom error and not return any client login info, as the there was an error regarding the e-mail stored and that which was searched (virtually impossible, but worth veryfying?)', async () => {
      
    // Criação de objetos simulado para a requisição
    const mockEmail = "maybeyouknowsomething@email.com";
    const mockPassword = "YeTaNoThErPW987";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se foram chamados (ou não)
    const findByEmailAndSenhaSpy = jest.spyOn(clientRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenClientRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginClientUseCase.execute(mockEmail, mockPassword);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Email ou senha incorretos", 401);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailAndSenhaSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();
  });
});

describe('LoginClientController, returns no info regarding the provided e-mail address', () => {
  let loginClientUseCase: LoginClientUseCase;
  let clientRepository:  ClientRepository;
  let tokenClientRepository: TokenClientRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByEmailAndSenha: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    // Criação de um objeto simulado para o caso de uso (TokenClientRepository)
    tokenClientRepository = {
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as TokenClientRepository;

    // Criação do serviço (LoginClientUseCase) injetando o caso de uso simulado
    loginClientUseCase = new LoginClientUseCase(
      clientRepository,
      tokenClientRepository
    );
  });

  // Teste para observar se um retorno vazio resulta em falha no login
  it('should call execute method of LoginClientUseCase, throw a custom error and not return any client login info, as the password is incorrect', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEmail = "youknownothing@email.com";
    const mockPassword = "thisIsIndeedIncorrect498587";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se foram chamados (ou não)
    const findByEmailAndSenhaSpy = jest.spyOn(clientRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenClientRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginClientUseCase.execute(mockEmail, mockPassword);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Email ou senha incorretos", 401);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailAndSenhaSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();
  });
});