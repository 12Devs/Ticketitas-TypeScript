import { ClientRepository } from "../../db/ClientRepository";
import { TokenClientRepository } from "../../db/TokenClientRepository";
import { ApiError } from "../../errors/ApiError";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

/**
 * Login client use case class
 * @date 6/6/2023 - 10:33:24 PM
 *
 * @class LoginClientUseCase
 * @typedef {LoginClientUseCase}
 */
class LoginClientUseCase {
    
    /**
     * Creates an instance of {@link LoginClientUseCase}.
     * @date 6/6/2023 - 10:33:28 PM
     *
     * @private
     * @type {ClientRepository}
     */
    private clientRepository: ClientRepository;
    private tokenClientRepository: TokenClientRepository;
    
    /**
     * Creates an instance of LoginClientUseCase.
     * @date 6/6/2023 - 10:33:33 PM
     *
     * @constructor
     * @param {ClientRepository} clientRepository
     * @param {TokenClientRepository} tokenClientRepository
     */
    constructor (clientRepository: ClientRepository, tokenClientRepository: TokenClientRepository) {
        this.clientRepository = clientRepository;
        this.tokenClientRepository = tokenClientRepository;
    }
    
    /**
     * Method for make a login of a client
     * @date 6/6/2023 - 10:33:37 PM
     *
     * @public
     * @async
     * @param {string} email
     * @param {string} senha
     * @returns {unknown}
     */
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
            
            process.env.JWT_SECRET,

            {subject: `${infoClient.cpf}`,
                expiresIn: process.env.EXPIRES_TOKEN});
        
        
        const refreshToken = await sign({tipo: "client", nome: infoClient.nome},
            
            process.env.JWT_REFRESH_SECRET,
            
            {subject: `${infoClient.cpf}`,
                expiresIn: process.env.EXPIRES_REFRESH_TOKEN});
        
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