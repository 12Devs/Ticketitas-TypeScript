import { AdministratorRepository } from "../../db/AdministratorRepository";
import { ApiError } from "../../errors/ApiError";
import bcrypt from 'bcrypt';


class CreateAdmUseCase {

    private admRepository: AdministratorRepository



    constructor (admRepository: AdministratorRepository) {
        this.admRepository =  admRepository;
    }




    public async execute (nome: string, cpf: number, email: string, telefone: number, senha: string) {
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


        const cpfExists = await this.admRepository.findByCpf(cpf);
        const emailExists = await this.admRepository.findByEmail(email);
        
        if(cpfExists) {
            throw new ApiError("Utilize outro cpf", 422);
        }
        
        if(emailExists) {
            throw new ApiError("Utilize outro email", 422);
        }

        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);
        await this.admRepository.create(nome, cpf, email, telefone, senhaHash);
    }








}
export { CreateAdmUseCase };