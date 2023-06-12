//Import of the repository classes
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { TokenAdministratorRepository } from "../../db/TokenAdministratorRepository";

//Import of the ApiError API
import { ApiError } from "../../errors/ApiError";

//Import of the class that will be tested here
import { LoginAdministratorUseCase } from "./LoginAdministratorUseCase";

//Import of the bcrypt module
import bcrypt from 'bcrypt';

describe('LoginAdministratorController', () => {
  let loginAdministratorUseCase: LoginAdministratorUseCase;
  let administratorRepository:  AdministratorRepository;
  let tokenAdministratorRepository: TokenAdministratorRepository;

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByEmailAndSenha: jest.fn().mockReturnValue({ name: "Outro Nome Sem Importacia", cpf: 84586545345, email: "youknownothing@email.com", password: "$2a$12$bFpND0cLaRrLDeaUq6qaf.saPTA3TyUJHmem/ECHhw29r/peM/4n6"}), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorRepository;

    // Criação de um objeto simulado para o caso de uso (TokenAdministratorRepository)
    tokenAdministratorRepository = {
      create: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as TokenAdministratorRepository;

    // Criação do serviço (LoginAdministratorUseCase) injetando o caso de uso simulado
    loginAdministratorUseCase = new LoginAdministratorUseCase(
      administratorRepository,
      tokenAdministratorRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente
  it('should call execute method of LoginAdministratorUseCase and return administrator login info', async () => {
    
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
});
