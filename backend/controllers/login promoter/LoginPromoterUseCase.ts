import { PromoterRepository } from "../../db/PromoterRepository";
import bcrypt from "bcrypt";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";
import auth from "../../config/auth";
import { TokenPromoterRepository } from "../../db/TokenPromoterRepository";

class LoginPromoterUseCase {

    private promoterRepository: PromoterRepository;
    private tokenPromoterRepository: TokenPromoterRepository;

    constructor (promoterRepository: PromoterRepository, tokenPromoterRepository: TokenPromoterRepository) {
        this.promoterRepository = promoterRepository;
        this.tokenPromoterRepository = tokenPromoterRepository;
    }

    public async execute (email: string, senha: string) {
        
        if (!email){
            throw new ApiError("O email é obrigatório", 422);
        }

        if (!senha){
            throw new ApiError("A senha é obrigatória", 422);
        }

        const infoPromoter: any = await this.promoterRepository.findByEmailAndSenha(email, senha);
        
        if (infoPromoter === null || infoPromoter === undefined) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        if (infoPromoter.email !== email) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const checkSenha = bcrypt.compareSync(senha, infoPromoter.senha);

        if (!checkSenha) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const token = sign({tipo: "promoter", nome: infoPromoter.nome},
            
        auth.secretToken,

        {subject: `${infoPromoter.cpf}`,
            expiresIn: auth.expiresInToken});
    
    
    const refreshToken = await sign({tipo: "promoter", nome: infoPromoter.nome},
        
        auth.secretRefreshToken,
        
        {subject: `${infoPromoter.cpf}`,
            expiresIn: auth.expiresInRefreshToken});
    
    var expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 30);

    await this.tokenPromoterRepository.create(infoPromoter.cpf, expiresDate, refreshToken);

    const promoter = {
        nome: infoPromoter.nome,
        cpf: infoPromoter.cpf,
        email: infoPromoter.email
    }
    
    return { promoter, token, refreshToken };
    }
}

export { LoginPromoterUseCase };