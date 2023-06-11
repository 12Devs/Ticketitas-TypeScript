import { EnderecoEvent } from "../models/EnderecoEvent";

/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 10:54:33 PM
 *
 * @class EnderecoEventRepository
 * @typedef {EnderecoEventRepository}
 */
class EnderecoEventRepository {
    
    /**
     * Creates an instance of {@link EnderecoEventRepository}.
     * @date 6/6/2023 - 10:54:37 PM
     *
     * @public
     * @async
     * @param {number} cep
     * @param {string} cidade
     * @param {string} estado
     * @param {string} bairro
     * @param {string} rua
     * @param {number} numero
     * @returns {*}
     */
    public async create (cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number){
        
        await EnderecoEvent.create({cep, estado, cidade , bairro, rua, numero});
        
    }
    
    /**
     * Manipulate method for make a search of a endereco
     * @date 6/6/2023 - 10:54:41 PM
     *
     * @public
     * @async
     * @param {number} cep
     * @param {string} bairro
     * @param {string} rua
     * @param {number} numero
     * @returns {unknown}
     */
    public async findByEndereco (cep: number, bairro: string, rua: string, numero: number) {
        const enderecoExists = await EnderecoEvent.findOne({raw: true, attributes: ['id'], where: {
            cep: cep,
            bairro: bairro,
            rua: rua,
            numero: numero
        }});
        
        return enderecoExists;
    }
    
    /**
     * Manipulate method for make a search of a endereco
     * @date 6/6/2023 - 10:54:46 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {unknown}
     */
    public async findOneEnderecoEvent (id: string) {
        const enderecoEvent = await EnderecoEvent.findOne({raw: true, where: {
            id: id
        }});

        return enderecoEvent;
    }
}

export { EnderecoEventRepository };