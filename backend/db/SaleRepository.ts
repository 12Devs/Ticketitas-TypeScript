import { Sale } from "../models/Sale";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 11:04:20 PM
 *
 * @class SaleRepository
 * @typedef {SaleRepository}
 */
class SaleRepository {
    
    /**
     * Creates an instance of {@link SaleRepository}.
     * @date 6/6/2023 - 11:04:26 PM
     *
     * @public
     * @async
     * @param {number} amount
     * @param {number} clientCpf
     * @param {string} eventId
     * @returns {*}
     */
    public async create (amount: number, clientCpf: number, eventId: string) {
        await Sale.create({amount, clientCpf, eventId});
    }
    
    /**
     * Find one sale id by cpf
     * @date 6/6/2023 - 11:04:31 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @returns {unknown}
     */
    public async findIdByCpf (clientCpf: number) {
        const saleExists = await Sale.findOne({raw: true, attributes: ['id'], where: {
            clientCpf: clientCpf
        }});
        return saleExists;
    }
    
    /**
     * Find one sale by event id
     * @date 6/6/2023 - 11:04:47 PM
     *
     * @public
     * @async
     * @param {string} eventId
     * @returns {unknown}
     */
    public async findSaleByEventId(eventId: string){
        const sale = await Sale.findOne({raw: true, attributes: ['id'], where: {
            eventId: eventId
        }});
        return sale;
    }
}

export { SaleRepository };