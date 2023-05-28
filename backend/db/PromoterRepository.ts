import { Promoter } from '../models/Promoter';
import { CreateEnderecoUserController } from '../controllers/create user endereco/CreateEnderecoUserController';
import { createEnderecoUserController } from '../controllers/create user endereco/index';

class PromoterRepository {

    private createEnderecoUserController: CreateEnderecoUserController

    public constructor (){
        this.createEnderecoUserController = createEnderecoUserController;
    }

    public async create (nome: string, cpf: number, email: string, telefone: number, senha: string, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){
        
        await this.createEnderecoUserController.handle(cep, estado, cidade, bairro, rua, numero).then(async (endereco: any)=>{
            const enderecoId = endereco.id;
            await Promoter.create({nome, cpf, email, telefone, senha, enderecoId});
        });
        
    }

    public async findOnePromoter(cpf: number) {

        const promoterExists = await Promoter.findOne({raw: true,
            where: {
            cpf: cpf
        }});
        return promoterExists;
    }

    public async findByCpf (cpf: number) {
        const cpfExists = await Promoter.findOne({raw: true, attributes: ['cpf'], where: {
            cpf: cpf
        }});
        return cpfExists;
    }

    public async findStatusByCpf (cpf: number) {
        const promoterExists = await Promoter.findOne({raw: true,
            attributes: ['cpf','status'],
            where: {
            cpf: cpf
        }});
        return promoterExists;
    }

    public async findByEmail (email: string) {
        const emailExists = await Promoter.findOne({raw: true, attributes: ['cpf'], where: {
            email: email
        }});
        return emailExists;
    }

    public async findInfosByEmail (email: string) {
        const promoter = await Promoter.findOne({raw: true,
            where: {
                email: email
            }});
        return promoter;
    }
    
    public async findByEmailAndSenha (email: string) {
        const promoter = await Promoter.findOne({raw: true, attributes: ['nome', 'cpf', 'email', 'senha'],
            where: {
                email: email
            }});
        return promoter;
    }

    public async findByCpfAndAvatar (cpf: number) {
        const cpfAndAvatar = await Promoter.findOne({raw: true, attributes: ['cpf', 'avatarImage'], where: {
            cpf: cpf
        }});
        return cpfAndAvatar;
    }

    public async findByCpfAndSenha (cpf: number) {
        const cpfAndSenha = await Promoter.findOne({raw: true, attributes: ['cpf', 'senha'], where: {
            cpf: cpf
        }});
        return cpfAndSenha;
    }

    public async updateAvatar (cpf: number, avatarImage: any){
        await Promoter.update({
            avatarImage: avatarImage
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateStatusRegistration (cpf: number){
        await Promoter.update({
            status: true
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateStatus (cpf: number, newStatus: boolean){
        await Promoter.update({
            status: newStatus
        },
        {
            where: {
                cpf: cpf
            }
        });
    }
    
    public async updatePassword (cpf: number, newPassword: string){
        await Promoter.update({
            senha: newPassword
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateCpf (cpf: number, newCpf: number){
        await Promoter.update({
            cpf: newCpf
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateName (cpf: number, newName: string){
        await Promoter.update({
            nome: newName
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateEmail (email: string, newEmail: string){
        await Promoter.update({
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
            
            await Promoter.update({
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
        await Promoter.update({
            telefone: newPhone
        },
        {
            where: {
                cpf: cpf
            }
        });
    }
}

export { PromoterRepository };