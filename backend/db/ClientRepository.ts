import { createEnderecoUserController } from "../controllers/create user endereco/index";
import { CreateEnderecoUserController } from "../controllers/create user endereco/CreateEnderecoUserController";
import { Client } from "../models/Client";

interface cpfAndAvatar {
    cpf: number,
    avatar: string
}

class ClientRepository {

    private createEnderecoUserController: CreateEnderecoUserController

    public constructor (){
        this.createEnderecoUserController = createEnderecoUserController;
    }

    public async create (nome: string, cpf: number, email: string, telefone: number, senha: string, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){
        
        await this.createEnderecoUserController.handle(cep, estado, cidade, bairro, rua, numero).then(async (enderecoUser: any)=>{
            const enderecoUserId = enderecoUser.id;
            await Client.create({nome, cpf, email, telefone, senha, enderecoUserId});
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

    
    public async findByCpfAndAvatar (cpf: number): Promise<any>{
        const cpfAndAvatar = await Client.findOne({raw: true, attributes: ['cpf', 'avatarImage'], where: {
            cpf: cpf
        }});
        return cpfAndAvatar;
    }
}

export { ClientRepository };