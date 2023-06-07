import { PromoterRepository } from "../../db/PromoterRepository";
import bcrypt from "bcrypt";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";
import { TokenPromoterRepository } from "../../db/TokenPromoterRepository";
import { PromoterRegistrationRequestRepository } from "../../db/PromoterRegistrationRequestRepository";

/**
 * Login promoter use case class
 * @date 6/6/2023 - 10:34:07 PM
 *
 * @class LoginPromoterUseCase
 * @typedef {LoginPromoterUseCase}
 */
class LoginPromoterUseCase {
    
    /**
     * Creates an instance of {@link LoginPromoterUseCase}.
     * @date 6/6/2023 - 10:34:16 PM
     *
     * @private
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;
    private tokenPromoterRepository: TokenPromoterRepository;
    private promoterRegistrationRequestRepository: PromoterRegistrationRequestRepository;
    
    /**
     * Creates an instance of LoginPromoterUseCase.
     * @date 6/6/2023 - 10:34:20 PM
     *
     * @constructor
     * @param {PromoterRepository} promoterRepository
     * @param {TokenPromoterRepository} tokenPromoterRepository
     * @param {PromoterRegistrationRequestRepository} promoterRegistrationRequestRepository
     */
    constructor (promoterRepository: PromoterRepository, tokenPromoterRepository: TokenPromoterRepository, promoterRegistrationRequestRepository: PromoterRegistrationRequestRepository) {
        this.promoterRepository = promoterRepository;
        this.tokenPromoterRepository = tokenPromoterRepository;
        this.promoterRegistrationRequestRepository = promoterRegistrationRequestRepository;
    }
    
    /**
     * Method for make a login of a promoter
     * @date 6/6/2023 - 10:34:24 PM
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

        const infoPromoter: any = await this.promoterRepository.findInfosByEmail(email);
        
        
        if (infoPromoter === null || infoPromoter === undefined) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        if (infoPromoter.email !== email) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const aprovacaoCadastro: any = await this.promoterRegistrationRequestRepository.findByCpf(infoPromoter.cpf);

        if (aprovacaoCadastro) {
            throw new ApiError("Cadastro aguardando aprovação", 422);
        }

        if (infoPromoter.status != true) {
            throw new ApiError("Promoter suspenso", 422);
        }

        const checkSenha = bcrypt.compareSync(senha, infoPromoter.senha);

        if (!checkSenha) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const token = sign({tipo: "promoter", nome: infoPromoter.nome},
            
        process.env.JWT_SECRET,

        {subject: `${infoPromoter.cpf}`,
            expiresIn: process.env.EXPIRES_TOKEN});
    
    
    const refreshToken = await sign({tipo: "promoter", nome: infoPromoter.nome},
        
        process.env.JWT_REFRESH_SECRET,
        
        {subject: `${infoPromoter.cpf}`,
            expiresIn: process.env.EXPIRES_REFRESH_TOKEN});
    
    var expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 30);

    await this.tokenPromoterRepository.create(infoPromoter.cpf, expiresDate, refreshToken);

    const promoter = {
        nome: infoPromoter.nome,
        cpf: infoPromoter.cpf,
        email: infoPromoter.email,
        status: infoPromoter.status
    }
    
    return { promoter, token, refreshToken };
    }
}

export { LoginPromoterUseCase };