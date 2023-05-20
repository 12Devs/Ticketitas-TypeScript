import { Sale } from "../models/Sale";


class SaleRepository {

    public create (amount: number, clientCpf: number, eventId: number) {
        Sale.create({amount, clientCpf, eventId});
    }
}

export { SaleRepository };