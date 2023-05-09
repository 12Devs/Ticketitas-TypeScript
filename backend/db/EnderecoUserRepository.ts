import { EnderecoUser } from "../models/EnderecoUser";


class EnderecoUserRepository {

    public async create (cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number){
        
        await EnderecoUser.create({cep, estado, cidade , bairro, rua, numero});
        
    }

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