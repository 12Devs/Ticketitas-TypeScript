import { PromoterRepository } from "../../db/PromoterRepository";
import { ApiError } from "../../errors/api.errors";
import bcrypt from "bcrypt";

class LoginPromoterUseCase {

    private promoterRepository: PromoterRepository

    constructor (promoterRepository: PromoterRepository) {
        this.promoterRepository = promoterRepository;
    }

    public async execute (email: string, senha: string) {
        
        if (!email){
            throw new ApiError("O email é obrigatório", 422);
        }

        if (!senha){
            throw new ApiError("A senha é obrigatória", 422);
        }

        const infoPromoter = await this.promoterRepository.findByEmailAndSenha(email, senha);
        
        if (infoPromoter === null || infoPromoter === undefined) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        
        if (infoPromoter.email !== email) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const checkSenha = bcrypt.compareSync(senha, infoClient.senha);

        if (!checkSenha) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        const promoter = {
            nome: infoPromoter.nome,
            cpf: infoPromoter.cpf,
            email: infoPromoter.email
        }
        
        return {promoter}
    }
}

export { LoginPromoterUseCase };