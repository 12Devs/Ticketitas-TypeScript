import { Endereco } from "../models/Endereco";

class EnderecoRepository {

    public async create (cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number){
        await Endereco.create({cep, estado, cidade , bairro, rua, numero});
    }

    public async findByEndereco (cep: number, bairro: string, rua: string, numero: number) {
        const enderecoExists = await Endereco.findOne({raw: true, attributes: ['id'], where: {
            cep: cep,
            bairro: bairro,
            rua: rua,
            numero: numero
        }});
        
        return enderecoExists;
    }
}

export { EnderecoRepository };