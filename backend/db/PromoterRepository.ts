
import { CreateEnderecoController} from '../controllers/create endereco/CreateEnderecoController';
import { Promoter } from '../models/promoter';
import { createEnderecoController } from '../controllers/create endereco';

class PromoterRepository {

    private createEnderecoController: CreateEnderecoController

    public constructor (){
        this.createEnderecoController = createEnderecoController;
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
}

export { PromoterRepository };