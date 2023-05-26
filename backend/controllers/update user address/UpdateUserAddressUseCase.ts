import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/ApiError";

class UpdateUserAddressUseCase {

    private clientRepository: ClientRepository;
    private promoterRepository: PromoterRepository;

    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
    }

    public async execute (tipo: string, cpf: number, cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number){
        
        if(!cep) {
            throw new ApiError("O novo CEP não pode ser vazio!", 422);
        }

        if(!cidade) {
            throw new ApiError("O novo nome da cidade não pode ser vazio!", 422);
        }

        if(!estado) {
            throw new ApiError("O novo nome do estado não pode ser vazio!", 422);
        }

        if(!bairro) {
            throw new ApiError("O novo nome do bairro não pode ser vazio!", 422);
        }

        if(!rua) {
            throw new ApiError("O novo nome da rua não pode ser vazio!", 422);
        }

        if(!numero) {
            throw new ApiError("O novo número do logradouro não pode ser vazio!", 422);
        }

        if (tipo === "client"){
            await this.clientRepository.updateAddress(cpf, cep, cidade, estado, bairro, rua, numero);
        } 
        else if (tipo === "promoter"){
            await this.promoterRepository.updateAddress(cpf, cep, cidade, estado, bairro, rua, numero);
        }
        else {
            throw new ApiError("Administradores não possuem endereço de residência em seu cadastro!", 422);
        }
    }

}

export { UpdateUserAddressUseCase };