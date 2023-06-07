import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { ApiError } from "../../errors/ApiError";


/**
 * Create endereco event use case class
 * @date 6/6/2023 - 10:09:48 PM
 *
 * @class CreateEnderecoEventUseCase
 * @typedef {CreateEnderecoEventUseCase}
 */
class CreateEnderecoEventUseCase {

    
    /**
     * Create an instance of {@link CreateEnderecoEventUseCase}
     * @date 6/6/2023 - 10:10:19 PM
     *
     * @private
     * @type {EnderecoEventRepository}
     */
    private enderecoEventRepository: EnderecoEventRepository

    
    /**
     * Creates an instance of CreateEnderecoEventUseCase.
     * @date 6/6/2023 - 10:10:29 PM
     *
     * @constructor
     * @public
     * @param {EnderecoEventRepository} enderecoEventRepository
     */
    public constructor (enderecoEventRepository: EnderecoEventRepository) {
        this.enderecoEventRepository =  enderecoEventRepository;
    }

    
    /**
     * Method for make a creation of a endereco event
     * @date 6/6/2023 - 10:10:41 PM
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