import { AdministratorRepository } from "../../db/AdministratorRepository";
import { ApiError } from "../../errors/api.errors";
import bcrypt from "bcrypt";

class LoginAdministratorUseCase {

    private administratorRepository: AdministratorRepository

    constructor (administratorRepository: AdministratorRepository) {
        this.administratorRepository = administratorRepository;
    }

    public async execute (email: string, senha: string) {
        
        if (!email){
            throw new ApiError("O email é obrigatório", 422);
        }

        if (!senha){
            throw new ApiError("A senha é obrigatória", 422);
        }

        const infoAdministrator = await this.administratorRepository.findByEmailAndSenha(email, senha);
        
        if (infoAdministrator === null || infoAdministrator === undefined) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        
        if (infoAdministrator.email !== email) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const checkSenha = bcrypt.compareSync(senha, infoAdministrator.senha);

        if (!checkSenha) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const administrator = {
            nome: infoAdministrator.nome,
            cpf: infoAdministrator.cpf,
            email: infoAdministrator.email
        }
        
        return {administrator}
    }
}

export { LoginAdministratorUseCase };