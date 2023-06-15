import { AdministratorRepository } from "../../db/AdministratorRepository";
import bcrypt from "bcrypt";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";
import { TokenAdministratorRepository } from "../../db/TokenAdministratorRepository";
import 'dotenv/config'
import { SuperAdministratorRelationRepository } from "../../db/SuperAdministratorRelationRepository";

/**
 * Login administrator use case class
 * @date 6/6/2023 - 10:32:40 PM
 *
 * @class LoginAdministratorUseCase
 * @typedef {LoginAdministratorUseCase}
 */
class LoginAdministratorUseCase {
    
    /**
     * Creates an instance of {@link LoginAdministratorUseCase}.
     * @date 6/6/2023 - 10:32:47 PM
     *
     * @private
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository;
    private superAdministratorRelationRepository: SuperAdministratorRelationRepository;
    private tokenAdministratorRepository: TokenAdministratorRepository;
    
    /**
     * Creates an instance of LoginAdministratorUseCase.
     * @date 6/6/2023 - 10:32:52 PM
     *
     * @constructor
     * @param {AdministratorRepository} administratorRepository
     * @param {TokenAdministratorRepository} tokenAdministratorRepository
     */
    constructor (administratorRepository: AdministratorRepository, superAdministratorRelationRepository: SuperAdministratorRelationRepository, tokenAdministratorRepository: TokenAdministratorRepository) {
        this.administratorRepository = administratorRepository;
        this.superAdministratorRelationRepository = superAdministratorRelationRepository;
        this.tokenAdministratorRepository = tokenAdministratorRepository;
    }
    
    /**
     * Method for make a login of a administrator
     * @date 6/6/2023 - 10:32:57 PM
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

        const infoAdministrator: any = await this.administratorRepository.findByEmailAndSenha(email);
        
        if (infoAdministrator === null || infoAdministrator === undefined) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        if (infoAdministrator.email !== email) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const checkSenha = bcrypt.compareSync(senha, infoAdministrator.password);

        if (!checkSenha) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const isSuper = await this.superAdministratorRelationRepository.findByCpf(infoAdministrator.cpf);

        if (isSuper) {
            const token = sign({tipo: "administrator", nome: infoAdministrator.name},
        
            process.env.JWT_SECRET as string,
    
            {subject: `${infoAdministrator.cpf}`,
                expiresIn: process.env.EXPIRES_TOKEN as string});
        
        
            const refreshToken = await sign({tipo: "super", nome: infoAdministrator.name},
                
                process.env.JWT_REFRESH_SECRET as string,
                
                {subject: `${infoAdministrator.cpf}`,
                    expiresIn: process.env.EXPIRES_REFRESH_TOKEN as string});
            
            var expiresDate = new Date();
            expiresDate.setDate(expiresDate.getDate() + 30);
        
            await this.tokenAdministratorRepository.create(infoAdministrator.cpf, expiresDate, refreshToken);
        
            const administrator = {
                nome: infoAdministrator.name,
                cpf: infoAdministrator.cpf,
                email: infoAdministrator.email
            }
            
            return { administrator, token, refreshToken };
        }

        const token = sign({tipo: "administrator", nome: infoAdministrator.name},
        
        process.env.JWT_SECRET as string,

        {subject: `${infoAdministrator.cpf}`,
            expiresIn: process.env.EXPIRES_TOKEN as string});
    
    
        const refreshToken = await sign({tipo: "administrator", nome: infoAdministrator.name},
        
        process.env.JWT_REFRESH_SECRET as string,
        
        {subject: `${infoAdministrator.cpf}`,
            expiresIn: process.env.EXPIRES_REFRESH_TOKEN as string});
    
        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);

        await this.tokenAdministratorRepository.create(infoAdministrator.cpf, expiresDate, refreshToken);

        const administrator = {
            nome: infoAdministrator.name,
            cpf: infoAdministrator.cpf,
            email: infoAdministrator.email
        }
    
        return { administrator, token, refreshToken };
    }
}

export { LoginAdministratorUseCase };