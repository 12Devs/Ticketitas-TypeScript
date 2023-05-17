import { EnderecoEvent } from "../models/EnderecoEvent";

class EnderecoEventRepository {

    public async create (cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number){
        
        await EnderecoEvent.create({cep, estado, cidade , bairro, rua, numero});
        
    }

    public async findByEndereco (cep: number, bairro: string, rua: string, numero: number) {
        const enderecoExists = await EnderecoEvent.findOne({raw: true, attributes: ['id'], where: {
            cep: cep,
            bairro: bairro,
            rua: rua,
            numero: numero
        }});
        
        return enderecoExists;
    }

    public async findOneEnderecoEvent (id: number) {
        const enderecoEvent = await EnderecoEvent.findOne({raw: true, where: {
            id: id
        }});

        return enderecoEvent;
    }
}

export { EnderecoEventRepository };