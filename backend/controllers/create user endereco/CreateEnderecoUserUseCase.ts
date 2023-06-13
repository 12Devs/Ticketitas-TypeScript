import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ApiError } from "../../errors/ApiError";
import { pesquisarCep } from "../../utils/PesquisarCep";

/**
 * Create endereco user use case class
 * @date 6/6/2023 - 10:17:01 PM
 *
 * @class CreateEnderecoUserUseCase
 * @typedef {CreateEnderecoUserUseCase}
 */
class CreateEnderecoUserUseCase {
    
    /**
     * Create an instance of {@link CreateEnderecoUserUseCase}
     * @date 6/6/2023 - 10:17:08 PM
     *
     * @private
     * @type {EnderecoUserRepository}
     */
    private enderecoUserRepository: EnderecoUserRepository
    
    /**
     * Creates an instance of CreateEnderecoUserUseCase.
     * @date 6/6/2023 - 10:17:15 PM
     *
     * @constructor
     * @public
     * @param {EnderecoUserRepository} enderecoUserRepository
     */
    public constructor (enderecoUserRepository: EnderecoUserRepository) {
        this.enderecoUserRepository =  enderecoUserRepository;
    }
    
    /**
     * Method for make a creation of a endereco user
     * @date 6/6/2023 - 10:17:19 PM
     *
     * @public
     * @async
     * @param {number} cep
     * @param {string} estado
     * @param {string} cidade
     * @param {string} bairro
     * @param {string} rua
     * @param {number} numero
     * @returns {unknown}
     */
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

        if (numero === undefined || numero === null){
            throw new ApiError("O numero é obrigatório!", 422);
        }

        const enderecoExists = await this.enderecoUserRepository.findByEndereco(cep, bairro, rua, numero);

        if(enderecoExists) {
            return enderecoExists;
        }

        await this.enderecoUserRepository.create(cep, estado, cidade , bairro, rua, numero);
        const enderecoId = await this.enderecoUserRepository.findByEndereco(cep, bairro, rua, numero);
        return enderecoId
    }
}

export { CreateEnderecoUserUseCase };