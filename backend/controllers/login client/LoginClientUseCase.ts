import auth from "../../config/auth";
import { ClientRepository } from "../../db/ClientRepository";
import { TokenClientRepository } from "../../db/TokenClientRepository";
import { ApiError } from "../../errors/ApiError";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

class LoginClientUseCase {

    private clientRepository: ClientRepository;
    private tokenClientRepository: TokenClientRepository;

    constructor (clientRepository: ClientRepository, tokenClientRepository: TokenClientRepository) {
        this.clientRepository = clientRepository;
        this.tokenClientRepository = tokenClientRepository;
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

        const token = sign({tipo: "client", nome: infoClient.nome},
            
            auth.secretToken,

            {subject: `${infoClient.cpf}`,
                expiresIn: auth.expiresInToken});
        
        
        const refreshToken = await sign({tipo: "client", nome: infoClient.nome},
            
            auth.secretRefreshToken,
            
            {subject: `${infoClient.cpf}`,
                expiresIn: auth.expiresInRefreshToken});
        
        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);

        await this.tokenClientRepository.create(infoClient.cpf, expiresDate, refreshToken);

        const client = {
            nome: infoClient.nome,
            cpf: infoClient.cpf,
            email: infoClient.email
        }
        
        return { client, token, refreshToken };
    }
}

export { LoginClientUseCase };