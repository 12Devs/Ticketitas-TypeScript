import { ClientRepository } from "../../db/ClientRepository";
import { ApiError } from "../../errors/ApiError";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

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

        const infoClient: any = await this.clientRepository.findByEmailAndSenha(email);
        
        if (infoClient === null || infoClient === undefined) {
            throw new ApiError("Email ou senha incorretos", 401);
        }
 
        if (infoClient.email !== email) {
            throw new ApiError("Email ou senha incorretos", 401);
        }

        const checkSenha = bcrypt.compareSync(senha, infoClient.senha);

        if (!checkSenha) {
            throw new ApiError("Email ou senha incorretos", 401);
        }

        const token = sign({nome: infoClient.nome},

            "vamoTirar10NessaBagaca",

            {subject: `${infoClient.cpf}`,
                expiresIn: "1d"});

        const client = {
            nome: infoClient.nome,
            cpf: infoClient.cpf,
            email: infoClient.email
        }
        
        return { client, token };
    }
}

export { LoginClientUseCase };