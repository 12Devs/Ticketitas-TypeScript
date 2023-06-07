import { createEnderecoUserController } from "../controllers/create user endereco/index";
import { CreateEnderecoUserController } from "../controllers/create user endereco/CreateEnderecoUserController";
import { Client } from "../models/Client";


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

    public async findOneClient(cpf: number) {

        const clientExists = await Client.findOne({raw: true,
            where: {
            cpf: cpf
        }});
        return clientExists;
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

    public async findByEmailAndSenha (email: string) {
        const client = await Client.findOne({raw: true, attributes: ['nome', 'cpf', 'email', 'senha'], where: {
            email: email
        }});
        return client;
    }

    
    public async findByCpfAndAvatar (cpf: number) {
        const cpfAndAvatar = await Client.findOne({raw: true, attributes: ['cpf', 'avatarImage'], where: {
            cpf: cpf
        }});
        return cpfAndAvatar;
    }

    public async findByCpfAndSenha (cpf: number) {
        const cpfAndSenha = await Client.findOne({raw: true, attributes: ['cpf', 'senha'], where: {
            cpf: cpf
        }});
        return cpfAndSenha;
    }

    public async updateAvatar (cpf: number, avatarImage: any){
        await Client.update({
            avatarImage: avatarImage
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updatePassword (cpf: number, newPassword: string){
        await Client.update({
            senha: newPassword
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateCpf (cpf: number, newCpf: number){
        await Client.update({
            cpf: newCpf
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateName (cpf: number, newName: string){
        await Client.update({
            nome: newName
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateEmail (email: string, newEmail: string){
        await Client.update({
            email: newEmail
        },
        {
            where: {
                email: email
            }
        });
    }

    public async updateAddress (cpf: number, cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number){
        await this.createEnderecoUserController.handle(cep, estado, cidade, bairro, rua, numero).then(async (enderecoUser: any)=>{
            const enderecoUserId = enderecoUser.id;
            
            await Client.update({
                enderecoUserId: enderecoUserId
            },
            {
                where: {
                    cpf: cpf
                }
            });
        });
    }

    public async updatePhone (cpf: number, newPhone: number){
        await Client.update({
            telefone: newPhone
        },
        {
            where: {
                cpf: cpf
            }
        });
    }
}

export { ClientRepository };