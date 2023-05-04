import { CreateEnderecoController } from "../controllers/create endereco/CreateEnderecoController";
import { createEnderecoController } from "../controllers/create endereco/index";
import { Client } from "../models/Client";


class ClientRepository {

    private createEnderecoController: CreateEnderecoController

    public constructor (){
        this.createEnderecoController = createEnderecoController;
    }

    public async create (nome: string, cpf: number, email: string, telefone: number, senha: string, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){
        
        await this.createEnderecoController.handle(cep, estado, cidade, bairro, rua, numero).then(async (endereco)=>{
            const enderecoId = endereco.id;
            await Client.create({nome, cpf, email, telefone, senha, enderecoId});
        });
        
    }

    public async findByCpf (cpf: number) {
        const cpfExists = await Client.findOne({raw: true, attributes: ['cpf'], where: {
            cpf: cpf
        }});
        return cpfExists;
    }

    public async findByEmail (email: string) {
        const emailExists = await Client.findOne({raw: true, attributes: ['cpf'], where: {
            email: email
        }});
        return emailExists;
    }

    public async findByEmailAndSenha (email: string, senha: string) {
        const client = await Client.findOne({raw: true, attributes: ['nome', 'cpf', 'email', 'senha'], where: {
            email: email
        }});
        return client;
    }
}

export { ClientRepository };