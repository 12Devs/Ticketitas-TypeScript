import { Card } from "../models/Card";


class CardRepository {

    public async create (clientCpf: number, cardNumber: number, holder: string, expirationDate: Date, cvv: number) {
        
        await Card.create({cardNumber, holder, expirationDate, cvv, clientCpf});
    }

    public async remove (id: number) {
        await Card.destroy({
            where: {id: id}
        })
    }

    public async findById (id: number) {
        const idExists = await Card.findOne({raw: true, attributes: ['id'], where: {
            id: id
        }});
        return idExists;
    }

    public async findByCpf (cpf: number) {
        const cpfExists = await Card.findOne({raw: true, attributes: ['id','clientCpf'], where: {
            clientCpf: cpf
        }});
        return cpfExists;
    }

    public async findAllByCpf (cpf: number) {
        const cpfExists = await Card.findOne({raw: true, where: {
            clientCpf: cpf
        }});
        return cpfExists;
    }
}

export { CardRepository };