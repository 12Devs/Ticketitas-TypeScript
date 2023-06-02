
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
            const enderecoUserId = endereco.id;
            await Promoter.create({nome, cpf, email, telefone, senha, enderecoUserId});
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

    public async findByCpfAndAvatar (cpf: number) {
        const cpfAndAvatar = await Promoter.findOne({raw: true, attributes: ['cpf', 'avatarImage'], where: {
            cpf: cpf
        }});
        return cpfAndAvatar;
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
}

export { PromoterRepository };