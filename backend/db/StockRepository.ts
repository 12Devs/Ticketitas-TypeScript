import { Stock } from "../models/Stock"


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 11:05:08 PM
 *
 * @class StockRepository
 * @typedef {StockRepository}
 */
class StockRepository {
    
    /**
     * Creates an instance of {@link StockRepository}.
     * @date 6/6/2023 - 11:05:12 PM
     *
     * @public
     * @async
     * @param {string} eventId
     * @param {number} quantPista
     * @param {number} quantStage
     * @param {number} quantVip
     * @returns {*}
     */
    public async create (eventId: string, quantPista: number, quantStage: number, quantVip: number) {

        Stock.create({quantPista, quantStage, quantVip, eventId});
    }
    
    /**
     * find stock by event id
     * @date 6/6/2023 - 11:05:17 PM
     *
     * @public
     * @async
     * @param {string} eventId
     * @returns {unknown}
     */
    public async findStock (eventId: string) {
        const stock = await Stock.findOne({raw: true,
            where: {
                eventId: eventId
        }});
        return stock;
    }
    
    /**
     * make sale
     * @date 6/6/2023 - 11:05:30 PM
     *
     * @public
     * @async
     * @param {string} eventId
     * @param {number} pistaAmount
     * @param {number} stageAmount
     * @param {number} vipAmount
     * @returns {*}
     */
    public async makeSale (eventId: string, pistaAmount: number, stageAmount: number, vipAmount: number){
        await Stock.update({
            quantPista: pistaAmount,
            quantStage: stageAmount,
            quantVip: vipAmount
        },
        {
            where: {
                eventId: eventId
            }
        });
    }

}

export { StockRepository }