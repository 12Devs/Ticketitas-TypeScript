
import { Promoter } from '../models/Promoter';
import { CreateEnderecoUserController } from '../controllers/create user endereco/CreateEnderecoUserController';
import { createEnderecoUserController } from '../controllers/create user endereco/index';

class PromoterRepository {

    private createEnderecoController: CreateEnderecoUserController

    public constructor (){
        this.createEnderecoController = createEnderecoUserController;
    }

    public async create (nome: string, cpf: number, email: string, telefone: number, senha: string, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){
        
        await this.createEnderecoController.handle(cep, estado, cidade, bairro, rua, numero).then(async (endereco: any)=>{
            const enderecoId = endereco.id;
            await Promoter.create({nome, cpf, email, telefone, senha, enderecoId});
        });
        
    }

    public async findByCpf (cpf: number) {
        const cpfExists = await Promoter.findOne({raw: true, attributes: ['cpf'], where: {
            cpf: cpf
        }});
        return cpfExists;
    }





    public async RemovePromoterByCpf(cpf: number) {
        const promoter = await Promoter.findOne({ where: { cpf } });
      
        if (!promoter) {
          throw new Error('Promoter not found'); // Tratar o caso em que o Promoter não é encontrado
        }
      
        await promoter.destroy();
      
        return true; // Retorna true para indicar que a remoção foi bem-sucedida
      }





    public async findByEmail (email: string) {
        const emailExists = await Promoter.findOne({raw: true, attributes: ['cpf'], where: {
            email: email
        }});
        return emailExists;
    }

    public async findByEmailAndSenha (email: string, senha: string) {
        const promoter = await Promoter.findOne({raw: true, attributes: ['nome', 'cpf', 'email', 'senha'], where: {
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