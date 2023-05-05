import { AdministratorRepository } from "../../db/AdministratorRepository";
import { AccessCodeRepository } from "../../db/AccessCodeRepository";
import { ApiError } from "../../errors/api.errors";
import randomstring from 'node-randomstring';

class CreateAdministratorUseCase {

    private administratorRepository: AdministratorRepository
    private accessCodeRepository: AccessCodeRepository

    constructor (administratorRepository: AdministratorRepository) {
        this.administratorRepository =  administratorRepository;
    }
    public async execute (nome: string, cpf: number, email: string, telefone: number, cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number) {
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

        /**
        if (!senha){
            throw new ApiError("A senha é obrigatória!", 422);
        }

        if (!confirmacaoSenha){
            throw new ApiError("A confirmacao de senha é obrigatória!", 422);
        }

        if(senha !== confirmacaoSenha){
            throw new ApiError("A senha e a confirmação de senha devem ser iguais!", 422);
        }
        
        if (!codigoDeCadastro){
            throw new ApiError("O código de cadastro é obrigatório!", 422);
        }
        */

        const cpfExists = await this.administratorRepository.findByCpf(cpf);
        const emailExists = await this.administratorRepository.findByEmail(email);
        
        /**
        const codigoExists = await this.accessCodeRepository.findByAccessCode(codigoDeCadastro);
        */

        if(cpfExists) {
            throw new ApiError("Utilize outro cpf", 422);
        }
        
        if(emailExists) {
            throw new ApiError("Utilize outro email", 422);
        }
        
        /**
        if(codigoExists == null) {
            throw new ApiError("Código de cadastro inválido", 422);
        }
        */

        const senha = await randomstring.generate(64);
        
        /**
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);
        */

        await this.administratorRepository.create(nome, cpf, email, telefone, senha, cep, cidade, estado, bairro, rua, numero);
        await this.accessCodeRepository.create(cpf);
    }
}

export { CreateAdministratorUseCase as CreateAdministratorUseCase };