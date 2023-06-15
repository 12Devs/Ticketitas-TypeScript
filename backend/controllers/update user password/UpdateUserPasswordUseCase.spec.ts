//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";

//Import of the EmailProvider and ApiError APIs
import { ApiError } from "../../errors/ApiError";

import { UpdateUserPasswordUseCase } from "./UpdateUserPasswordUseCase";

describe('UpdateUserPasswordController', () => {
  let updateUserPasswordUseCase: UpdateUserPasswordUseCase;
  let clientRepository: ClientRepository;
  let promoterRepository: PromoterRepository;
  let administratorRepository: AdministratorRepository

  beforeEach(() => {
    // Criação de um objeto simulado para o caso de uso (ClientRepository)
    clientRepository = {
      findByCpfAndSenha: jest.fn().mockReturnValue({cpf: 98765432145, senha: "$2a$12$3XkH.6YyHd9hE.v03FDxIu431gr3ScHMRl2ay.jVAzuJ/iSTpXWZm"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updatePassword: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as ClientRepository;

    // Criação de um objeto simulado para o caso de uso (PromoterRepository)
    promoterRepository = {
      findByCpfAndSenha: jest.fn().mockReturnValue({cpf: 48767432145, senha:"$2a$12$A2RG1cutCv4p95h8t5H5xOMK4kPkFJDoG.M9xtqbYN8MlbR1lYXVy"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updatePassword: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as PromoterRepository;

    // Criação de um objeto simulado para o caso de uso (AdministratorRepository)
    administratorRepository = {
      findByCpfAndSenha: jest.fn().mockReturnValue({cpf: 18545432145, password:"$2a$12$NFMFurbCHF7CjbowBQLeg.zdYkdVumOVvutaN/oI5FreB7sCNawsu"}), // Utilizamos o jest.fn() para criar uma função simulada e o mockReturnValue para estabelecer um retorno padrão para as chamadas da função simulada
      updatePassword: jest.fn(), // Utilizamos o jest.fn() para criar uma função simulada
    } as unknown as AdministratorRepository;

    // Criação do serviço (UpdateUserPasswordUseCase) injetando o caso de uso simulado
    updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
      clientRepository,
      promoterRepository,
      administratorRepository
    );
  });

  // Teste para verificar se o método execute é chamado corretamente para cliente
  it('should call execute method of UpdateUserPasswordUseCase and return a success message regarding the operation (client type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "client";
    const mockCpf = 98765432145;
    const mockOldPassword = "LZZ92ZuTv4crC9I";
    const mockNewPassword = "VpYg6wJYJy";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const promoterUpdatePasswordSpy = jest.spyOn(promoterRepository, 'updatePassword');
    const administratorUpdatePasswordSpy = jest.spyOn(administratorRepository, 'updatePassword');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserPasswordUseCase.execute(mockTipo, mockCpf, mockOldPassword, mockNewPassword, mockNewPassword);

    // Verificar se o método updatePassword foi chamado com os parâmetros corretos (o Hash pode ser mais de um resultado, portanto esperamos qualquer coisa aqui)
    expect(clientUpdatePasswordSpy).toHaveBeenCalledWith(mockCpf, expect.stringContaining(""));

    // Verificar se o método updatePassword não foi chamado
    expect(promoterUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(administratorUpdatePasswordSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute é chamado corretamente para promoter
  it('should call execute method of UpdateUserPasswordUseCase and return a success message regarding the operation (promoter type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockOldPassword = "bAffneEydLYoo4sNaAsnesLFsKHfxsHme6l";
    const mockNewPassword = "Z7RB8vtrwETbl";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const promoterUpdatePasswordSpy = jest.spyOn(promoterRepository, 'updatePassword');
    const administratorUpdatePasswordSpy = jest.spyOn(administratorRepository, 'updatePassword');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserPasswordUseCase.execute(mockTipo, mockCpf, mockOldPassword, mockNewPassword, mockNewPassword);

    // Verificar se o método updatePassword não foi chamado
    expect(clientUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword foi chamado com os parâmetros corretos (o Hash pode ser mais de um resultado, portanto esperamos qualquer coisa aqui)
    expect(promoterUpdatePasswordSpy).toHaveBeenCalledWith(mockCpf, expect.stringContaining(""));

    // Verificar se o método updatePassword não foi chamado
    expect(administratorUpdatePasswordSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute é chamado corretamente para administrator
  it('should call execute method of UpdateUserPasswordUseCase and return a success message regarding the operation (client type)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockOldPassword = "AFOYRuixgFEDXGWGOGeQndHMcH";
    const mockNewPassword = "7PeXp0w9MekiTII2us3SD8MRFtX59o";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const promoterUpdatePasswordSpy = jest.spyOn(promoterRepository, 'updatePassword');
    const administratorUpdatePasswordSpy = jest.spyOn(administratorRepository, 'updatePassword');

    // Chamar o método handle do controlador com os objetos simulados de requisição e resposta
    await updateUserPasswordUseCase.execute(mockTipo, mockCpf, mockOldPassword, mockNewPassword, mockNewPassword);

    // Verificar se o método updatePassword não foi chamado
    expect(clientUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(promoterUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword foi chamado com os parâmetros corretos (o Hash pode ser mais de um resultado, portanto esperamos qualquer coisa aqui)
    expect(administratorUpdatePasswordSpy).toHaveBeenCalledWith(mockCpf, expect.stringContaining(""));
  });

  // Teste para verificar se o método execute falha caso a nova senha esteja vazia
  it('should call execute method of UpdateUserPasswordUseCase, throw an error and NOT return a success message due to lack of new user password', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockOldPassword = "AFOYRuixgFEDXGWGOGeQndHMcH";
    const mockNewPassword = "";
    const mockNewPasswordConfirmation = "7PeXp0w9MekiTII2us3SD8MRFtX59o";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const promoterUpdatePasswordSpy = jest.spyOn(promoterRepository, 'updatePassword');
    const administratorUpdatePasswordSpy = jest.spyOn(administratorRepository, 'updatePassword');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserPasswordUseCase.execute(mockTipo, mockCpf, mockOldPassword, mockNewPassword, mockNewPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("A nova senha não pode ser vazia!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updatePassword não foi chamado
    expect(clientUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(promoterUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(administratorUpdatePasswordSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso a confirmação da nova senha esteja vazia
  it('should call execute method of UpdateUserPasswordUseCase, throw an error and NOT return a success message due to lack of confirmation of the new user password', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockOldPassword = "AFOYRuixgFEDXGWGOGeQndHMcH";
    const mockNewPassword = "7PeXp0w9MekiTII2us3SD8MRFtX59o";
    const mockNewPasswordConfirmation = "";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const promoterUpdatePasswordSpy = jest.spyOn(promoterRepository, 'updatePassword');
    const administratorUpdatePasswordSpy = jest.spyOn(administratorRepository, 'updatePassword');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserPasswordUseCase.execute(mockTipo, mockCpf, mockOldPassword, mockNewPassword, mockNewPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("É necessário confirmar sua nova senha!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updatePassword não foi chamado
    expect(clientUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(promoterUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(administratorUpdatePasswordSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso a nova senha e sua confirmação não coincidam
  it('should call execute method of UpdateUserPasswordUseCase, throw an error and NOT return a success message due to a mismatch regarding password confirmation', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockOldPassword = "bAffneEydLYoo4sNaAsnesLFsKHfxsHme6l";
    const mockNewPassword = "Z7RB8vtrwETbl";
    const mockNewPasswordConfirmation = "xV8PXPRZlnrky";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const promoterUpdatePasswordSpy = jest.spyOn(promoterRepository, 'updatePassword');
    const administratorUpdatePasswordSpy = jest.spyOn(administratorRepository, 'updatePassword');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserPasswordUseCase.execute(mockTipo, mockCpf, mockOldPassword, mockNewPassword, mockNewPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("A senha não coincide com sua confirmação!", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updatePassword não foi chamado
    expect(clientUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(promoterUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(administratorUpdatePasswordSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso a senha do cliente não coincida com o hash guardado no BD
  it('should call execute method of UpdateUserPasswordUseCase, throw an error and NOT return a success message due to providing an incorrect password (client)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "client";
    const mockCpf = 98765432145;
    const mockOldPassword = "1U6ztcJcvaSuFvylEMLdykIAaL";
    const mockNewPassword = "7PeXp0w9MekiTII2us3SD8MRFtX59o";
    const mockNewPasswordConfirmation = "7PeXp0w9MekiTII2us3SD8MRFtX59o";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const promoterUpdatePasswordSpy = jest.spyOn(promoterRepository, 'updatePassword');
    const administratorUpdatePasswordSpy = jest.spyOn(administratorRepository, 'updatePassword');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserPasswordUseCase.execute(mockTipo, mockCpf, mockOldPassword, mockNewPassword, mockNewPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updatePassword não foi chamado
    expect(clientUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(promoterUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(administratorUpdatePasswordSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso a senha do promotor não coincida com o hash guardado no BD
  it('should call execute method of UpdateUserPasswordUseCase, throw an error and NOT return a success message due to providing an incorrect password (promoter)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "promoter";
    const mockCpf = 48767432145;
    const mockOldPassword = "SLD9UBr";
    const mockNewPassword = "VpYg6wJYJy";
    const mockNewPasswordConfirmation = "VpYg6wJYJy";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const promoterUpdatePasswordSpy = jest.spyOn(promoterRepository, 'updatePassword');
    const administratorUpdatePasswordSpy = jest.spyOn(administratorRepository, 'updatePassword');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserPasswordUseCase.execute(mockTipo, mockCpf, mockOldPassword, mockNewPassword, mockNewPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updatePassword não foi chamado
    expect(clientUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(promoterUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(administratorUpdatePasswordSpy).not.toHaveBeenCalled();
  });

  // Teste para verificar se o método execute falha caso a senha do administrador não coincida com o hash guardado no BD
  it('should call execute method of UpdateUserPasswordUseCase, throw an error and NOT return a success message due to providing an incorrect password (administrator)', async () => {
    
    // Criação de objetos simulado para a requisição
    const mockTipo = "administrator";
    const mockCpf = 18545432145;
    const mockOldPassword = "1U6ztcJcvaSuFvylEMLdykIAaL";
    const mockNewPassword = "7PeXp0w9MekiTII2us3SD8MRFtX59o";
    const mockNewPasswordConfirmation = "7PeXp0w9MekiTII2us3SD8MRFtX59o";
    
    // Espionar o método execute do caso de uso simulado para verificar se foi chamado corretamente
    const clientUpdatePasswordSpy = jest.spyOn(clientRepository, 'updatePassword');
    const promoterUpdatePasswordSpy = jest.spyOn(promoterRepository, 'updatePassword');
    const administratorUpdatePasswordSpy = jest.spyOn(administratorRepository, 'updatePassword');

    // Chamar o método execute do serviço com os argumentos desejados e verificar que um erro específico ocorreu
    try {
      await updateUserPasswordUseCase.execute(mockTipo, mockCpf, mockOldPassword, mockNewPassword, mockNewPasswordConfirmation);
    }
    catch(error) {
      const thrownError = error;
      
      //Formular o objeto de erro para comparação
      const expectedError = new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);

      //Comparação dos erros
      expect(thrownError).toEqual(expectedError);
    }

    // Verificar se o método updatePassword não foi chamado
    expect(clientUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(promoterUpdatePasswordSpy).not.toHaveBeenCalled();

    // Verificar se o método updatePassword não foi chamado
    expect(administratorUpdatePasswordSpy).not.toHaveBeenCalled();
  });
});