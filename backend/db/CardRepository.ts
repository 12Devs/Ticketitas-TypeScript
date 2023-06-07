

import { Card } from "../models/Card";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 10:50:57 PM
 *
 * @class CardRepository
 * @typedef {CardRepository}
 */
class CardRepository {
    
    /**
     * Creates an instance of {@link CardRepository}.
     * @date 6/6/2023 - 10:51:01 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @param {number} cardNumber
     * @param {string} holder
     * @param {Date} expirationDate
     * @param {number} cvv
     * @returns {*}
     */
    public async create (clientCpf: number, cardNumber: number, holder: string, expirationDate: Date, cvv: number) {
        
        await Card.create({cardNumber, holder, expirationDate, cvv, clientCpf});
    }
    
    /**
     * Remove a card
     * @date 6/6/2023 - 10:51:05 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {*}
     */
    public async remove (id: string) {
        await Card.destroy({
            where: {id: id}
        })
    }
    
    /**
     * Find a card by id
     * @date 6/6/2023 - 10:51:09 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {unknown}
     */
    public async findById (id: string) {
        const idExists = await Card.findOne({raw: true, attributes: ['id'], where: {
            id: id
        }});
        return idExists;
    }
    
    /**
     * Find a card by cpf
     * @date 6/6/2023 - 10:51:26 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findByCpf (cpf: number) {
        const cpfExists = await Card.findOne({raw: true, attributes: ['id','clientCpf'], where: {
            clientCpf: cpf
        }});
        return cpfExists;
    }
    
    /**
     * Find all cards by cpf
     * @date 6/6/2023 - 10:51:31 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findAllByCpf (cpf: number) {
        const cpfExists = await Card.findOne({raw: true, where: {
            clientCpf: cpf
        }});
        return cpfExists;
    }
}

export { CardRepository };