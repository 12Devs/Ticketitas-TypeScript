//Import of the repository classes
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { SuperAdministratorRelationRepository } from "../../db/SuperAdministratorRelationRepository";
import { TokenAdministratorRepository } from "../../db/TokenAdministratorRepository";

//Import of the ApiError API
import { ApiError } from "../../errors/ApiError";

//Import of the class that will be tested here
import { LoginAdministratorUseCase } from "./LoginAdministratorUseCase";

describe('LoginAdministratorController, returns info when the DB is asked for the existence of an user with a certain email address (normal administrator case)', () => {
  let loginAdministratorUseCase: LoginAdministratorUseCase;
  let administratorRepository:  AdministratorRepository;
  let superAdministratorRelationRepository: SuperAdministratorRelationRepository;
  let tokenAdministratorRepository: TokenAdministratorRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByEmailAndSenha: jest.fn().mockReturnValue({ name: "Outro Nome Sem Importacia", cpf: 84586545345, email: "youknownothing@email.com", password: "$2a$12$bFpND0cLaRrLDeaUq6qaf.saPTA3TyUJHmem/ECHhw29r/peM/4n6"}), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorRepository;

    // Criação de um objeto simulado para o caso de uso (SuperAdministratorRelationRepository)
    superAdministratorRelationRepository = {
      findByCpf: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as SuperAdministratorRelationRepository;

    // Criação de um objeto simulado para o caso de uso (TokenAdministratorRepository)
    tokenAdministratorRepository = {
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as TokenAdministratorRepository;

    // Criação do serviço (LoginAdministratorUseCase) injetando o caso de uso simulado
    loginAdministratorUseCase = new LoginAdministratorUseCase(
      administratorRepository,
      superAdministratorRelationRepository,
      tokenAdministratorRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of LoginAdministratorUseCase and return administrator login info (normal administrator case)', async () => {
    
    // Criação de objetos simulados para a requisição
    const mockEmail = "youknownothing@email.com";
    const mockPassword = "YeTaNoThErPW987";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailAndSenhaSpy = jest.spyOn(administratorRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenAdministratorRepository, 'create');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const mockReturn = await loginAdministratorUseCase.execute(mockEmail, mockPassword);

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailAndSenhaSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create foi chamado com o parâmetro correto
    //Infelizmente, o modulo jsonwebtoken nao tem muito suporte para mocking, porem ainda podemos conferir o cpf correto sendo passado para a funcao que cria o token.
    expect(createSpy).toHaveBeenCalledWith(84586545345, expect.anything(), expect.anything());

    // Verificar se o a criação foi bem-sucedida por meio de verificação do return
    expect(mockReturn.administrator).not.toBe(null);
  });

  // Teste para observar se a verificação de email (não pode estar vazio) é feita corretamente
  it('should call execute method of LoginAdministratorUseCase, throw a custom error and not return any administrator login info, as the email is empty', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEmail = "";
    const mockPassword = "YeTaNoThErPW987";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByEmailAndSenhaSpy = jest.spyOn(administratorRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenAdministratorRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginAdministratorUseCase.execute(mockEmail, mockPassword);
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
  it('should call execute method of LoginAdministratorUseCase, throw a custom error and not return any administrator login info, as the password is empty', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEmail = "youknownothing@email.com";
    const mockPassword = "";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se (não) foram chamados
    const findByEmailAndSenhaSpy = jest.spyOn(administratorRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenAdministratorRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginAdministratorUseCase.execute(mockEmail, mockPassword);
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
  it('should call execute method of LoginAdministratorUseCase, throw a custom error and not return any administrator login info, as the password is incorrect', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEmail = "youknownothing@email.com";
    const mockPassword = "thisIsIndeedIncorrect498587";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se foram chamados (ou não)
    const findByEmailAndSenhaSpy = jest.spyOn(administratorRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenAdministratorRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginAdministratorUseCase.execute(mockEmail, mockPassword);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Email ou senha incorretos", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailAndSenhaSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();
  });

  // Teste para observar se um erro na coincidência de e-mail resulta em falha do login (tecnicamente impossível, mas quem desenhou este UseCase preferiu assim verifica-lo)
  it('should call execute method of LoginAdministratorUseCase, throw a custom error and not return any administrator login info, as the there was an error regarding the e-mail stored and that which was searched (virtually impossible, but worth veryfying?)', async () => {
      
    // Criação de objetos simulado para a requisição
    const mockEmail = "maybeyouknowsomething@email.com";
    const mockPassword = "YeTaNoThErPW987";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se foram chamados (ou não)
    const findByEmailAndSenhaSpy = jest.spyOn(administratorRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenAdministratorRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginAdministratorUseCase.execute(mockEmail, mockPassword);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Email ou senha incorretos", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailAndSenhaSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();
  });
});

describe('LoginAdministratorController, returns no info regarding the provided e-mail address', () => {
  let loginAdministratorUseCase: LoginAdministratorUseCase;
  let administratorRepository:  AdministratorRepository;
  let superAdministratorRelationRepository: SuperAdministratorRelationRepository;
  let tokenAdministratorRepository: TokenAdministratorRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByEmailAndSenha: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorRepository;

    // Criação de um objeto simulado para o caso de uso (SuperAdministratorRelationRepository)
    superAdministratorRelationRepository = {
      findByCpf: jest.fn() // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as SuperAdministratorRelationRepository;

    // Criação de um objeto simulado para o caso de uso (TokenAdministratorRepository)
    tokenAdministratorRepository = {
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as TokenAdministratorRepository;

    // Criação do serviço (LoginAdministratorUseCase) injetando o caso de uso simulado
    loginAdministratorUseCase = new LoginAdministratorUseCase(
      administratorRepository,
      superAdministratorRelationRepository,
      tokenAdministratorRepository
    );
  });

  // Teste para observar se um retorno vazio resulta em falha no login
  it('should call execute method of LoginAdministratorUseCase, throw a custom error and not return any administrator login info, as the password is incorrect', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockEmail = "youknownothing@email.com";
    const mockPassword = "thisIsIndeedIncorrect498587";
    
    // Espionar os métodos utilizados pela instância de serviço simulada para verificar se foram chamados (ou não)
    const findByEmailAndSenhaSpy = jest.spyOn(administratorRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenAdministratorRepository, 'create');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await loginAdministratorUseCase.execute(mockEmail, mockPassword);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Email ou senha incorretos", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailAndSenhaSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create não foi chamado
    expect(createSpy).not.toHaveBeenCalled();
  });
});

describe('LoginAdministratorController, returns info when the DB is asked for the existence of an user with a certain email address (super administrator case)', () => {
  let loginAdministratorUseCase: LoginAdministratorUseCase;
  let administratorRepository:  AdministratorRepository;
  let superAdministratorRelationRepository: SuperAdministratorRelationRepository;
  let tokenAdministratorRepository: TokenAdministratorRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByEmailAndSenha: jest.fn().mockReturnValue({ name: "Outro Nome Sem Importacia", cpf: 84586545345, email: "youknownothing@email.com", password: "$2a$12$bFpND0cLaRrLDeaUq6qaf.saPTA3TyUJHmem/ECHhw29r/peM/4n6"}), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorRepository;

    // Criação de um objeto simulado para o caso de uso (SuperAdministratorRelationRepository)
    superAdministratorRelationRepository = {
      findByCpf: jest.fn().mockReturnValue({cpf: 84586545345}) // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as SuperAdministratorRelationRepository;

    // Criação de um objeto simulado para o caso de uso (TokenAdministratorRepository)
    tokenAdministratorRepository = {
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as TokenAdministratorRepository;

    // Criação do serviço (LoginAdministratorUseCase) injetando o caso de uso simulado
    loginAdministratorUseCase = new LoginAdministratorUseCase(
      administratorRepository,
      superAdministratorRelationRepository,
      tokenAdministratorRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of LoginAdministratorUseCase and return administrator login info (super administrator case)', async () => {
    
    // Criação de objetos simulados para a requisição
    const mockEmail = "youknownothing@email.com";
    const mockPassword = "YeTaNoThErPW987";

    // Espionar os métodos do caso de uso simulado para verificar se foram chamados corretamente
    const findByEmailAndSenhaSpy = jest.spyOn(administratorRepository, 'findByEmailAndSenha');
    const createSpy = jest.spyOn(tokenAdministratorRepository, 'create');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    const mockReturn = await loginAdministratorUseCase.execute(mockEmail, mockPassword);

    // Verificar se o método findByEmailAndSenha foi chamado com o parâmetro correto
    expect(findByEmailAndSenhaSpy).toHaveBeenCalledWith(mockEmail);

    // Verificar se o método create foi chamado com o parâmetro correto
    //Infelizmente, o modulo jsonwebtoken nao tem muito suporte para mocking, porem ainda podemos conferir o cpf correto sendo passado para a funcao que cria o token.
    expect(createSpy).toHaveBeenCalledWith(84586545345, expect.anything(), expect.anything());

    // Verificar se o a criação foi bem-sucedida por meio de verificação do return
    expect(mockReturn.administrator).not.toBe(null);
  });
});