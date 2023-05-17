import { ClientRepository } from "../../db/ClientRepository";
import { ApiError } from "../../errors/ApiError";
import bcrypt from "bcrypt";

class LoginClientUseCase {

    private clientRepository: ClientRepository

    constructor (clientRepository: ClientRepository) {
        this.clientRepository = clientRepository;
    }

    public async execute (email: string, senha: string) {
        
        if (!email){
            throw new ApiError("O email é obrigatório", 422);
        }

        if (!senha){
            throw new ApiError("A senha é obrigatória", 422);
        }

        const infoClient = await this.clientRepository.findByEmailAndSenha(email, senha);
        
        if (infoClient === null || infoClient === undefined) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        
        if (infoClient.email !== email) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const checkSenha = bcrypt.compareSync(senha, infoClient.senha);

        if (!checkSenha) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const client = {
            nome: infoClient.nome,
            cpf: infoClient.cpf,
            email: infoClient.email
        }
        
        return {client}
    }
}

export { LoginClientUseCase };