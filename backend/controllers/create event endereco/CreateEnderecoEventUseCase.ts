
import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { ApiError } from "../../errors/api.errors";
import { pesquisarCep } from "../../middlewares/PesquisarCep";

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

        const dadosEndereco = await pesquisarCep(cep);

        if (!estado){
            estado = dadosEndereco.uf;
        }

        if (!cidade){
            cidade = dadosEndereco.localidade;
        }

        if (!bairro && !dadosEndereco.bairro){
            throw new ApiError("O bairro é obrigatório!", 422);
        }

        if (!rua && !dadosEndereco.rua){
            throw new ApiError("A rua é obrigatória!", 422);
        }

        if (!numero){
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