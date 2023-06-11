import { EnderecoUser } from "../models/EnderecoUser";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 10:49:30 PM
 *
 * @class EnderecoUserRepository
 * @typedef {EnderecoUserRepository}
 */
class EnderecoUserRepository {
    
    /**
     * Creates an instance of {@link EnderecoUserRepository}.
     * @date 6/6/2023 - 10:49:35 PM
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
        
        await EnderecoUser.create({cep, estado, cidade , bairro, rua, numero});
        
    }
    
    /**
     * Find one endereco by id
     * @date 6/6/2023 - 10:49:45 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {unknown}
     */
    public async findOneEnderecoUser (id: string) {
        const enderecoUser = await EnderecoUser.findOne({raw: true, where: {
            id: id
        }});

        return enderecoUser;
    }
    
    /**
     * Find user by endereco
     * @date 6/6/2023 - 10:49:49 PM
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
        const enderecoExists = await EnderecoUser.findOne({raw: true, attributes: ['id'], where: {
            cep: cep,
            bairro: bairro,
            rua: rua,
            numero: numero
        }});
        
        return enderecoExists;
    }
}

export { EnderecoUserRepository };