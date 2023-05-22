import bcrypt from 'bcrypt';
import { ApiError } from '../../errors/ApiError';
import { PromoterRepository } from '../../db/PromoterRepository';

class CreatePromoterUseCase {

    private promoterRepository: PromoterRepository

    constructor (promoterRepository: PromoterRepository) {
        this.promoterRepository =  promoterRepository;
    }
    
    public async execute (nome: string, cpf: number, email: string, telefone: number, senha: string, confirmacaoSenha: string, cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number) {
        //Validations
        if (!nome){
            throw new ApiError("O nome é obrigatório!", 422);
        }

        if (!cpf){
            throw new ApiError("O cpf é obrigatório!", 422);
        }

        if (!email){
            throw new ApiError("O email é obrigatório!", 422);
        }

        if (!telefone){
            throw new ApiError("O telefone é obrigatório!", 422);
        }

        if (!senha){
            throw new ApiError("A senha é obrigatória!", 422);
        }

        if (!confirmacaoSenha){
            throw new ApiError("A confirmacao de senha é obrigatória!", 422);
        }

        if(senha !== confirmacaoSenha){
            throw new ApiError("A senha e a confirmação de senha devem ser iguais!", 422);
        }

        const cpfExists = await this.promoterRepository.findByCpf(cpf);
        const emailExists = await this.promoterRepository.findByEmail(email);
        
        
        if(cpfExists) {
            throw new ApiError("Utilize outro cpf", 422);
        }
        
        if(emailExists) {
            throw new ApiError("Utilize outro email", 422);
        }

        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);
        await this.promoterRepository.create(nome, cpf, email, telefone, senhaHash, cep, cidade, estado, bairro, rua, numero);
    }
}

export { CreatePromoterUseCase }