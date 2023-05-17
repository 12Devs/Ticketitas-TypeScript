import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { ApiError } from "../../errors/ApiError";

class CreateEnderecoEventUseCase {
    private enderecoEventRepository: EnderecoEventRepository

    public constructor (enderecoEventRepository: EnderecoEventRepository) {
        this.enderecoEventRepository =  enderecoEventRepository;
    }

    public async execute (cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number) {

        //Validations
        if (!cep){
            throw new ApiError("O cep é obrigatório!", 422);
        }

        if (!estado){
            throw new ApiError("O estado é obrigatório!", 422);
        }

        if (!cidade){
            throw new ApiError("A cidade é obrigatória!", 422);
        }

        if (!bairro){
            throw new ApiError("O bairro é obrigatório!", 422);
        }

        if (!rua){
            throw new ApiError("A rua é obrigatória!", 422);
        }

        if (numero === undefined || numero === null){
            throw new ApiError("O numero é obrigatório!", 422);
        }

        const enderecoExists = await this.enderecoEventRepository.findByEndereco(cep, bairro, rua, numero);

        if(enderecoExists) {
            return enderecoExists;
        }

        await this.enderecoEventRepository.create(cep, estado, cidade , bairro, rua, numero);
        const enderecoId = await this.enderecoEventRepository.findByEndereco(cep, bairro, rua, numero);
        return enderecoId
    }
}

export { CreateEnderecoEventUseCase };