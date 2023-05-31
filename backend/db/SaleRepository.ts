import { Sale } from "../models/Sale";

class SaleRepository {

    public async create (amount: number, clientCpf: number, eventId: string) {
        await Sale.create({amount, clientCpf, eventId});
    }

    public async findIdByCpf (clientCpf: number) {
        const saleExists = await Sale.findOne({raw: true, attributes: ['id'], where: {
            clientCpf: clientCpf
        }});
        return saleExists;
    }

}

export { SaleRepository };