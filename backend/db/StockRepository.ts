import { Stock } from "../models/Stock"


class StockRepository {

    public async create (eventId: string, quantPista: number, quantStage: number, quantVip: number) {

        Stock.create({quantPista, quantStage, quantVip, eventId});
    }

    public async findStock (eventId: string) {
        const stock = await Stock.findOne({raw: true,
            where: {
                eventId: eventId
        }});
        return stock;
    }

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