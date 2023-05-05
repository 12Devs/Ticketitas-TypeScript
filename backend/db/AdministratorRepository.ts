import { CreateEnderecoController } from "../controllers/create endereco/CreateEnderecoController";
import { createEnderecoController } from "../controllers/create endereco/index";
import { Administrator } from "../models/Administrator";
import { AccessCodeRepository } from "../db/AccessCodeRepository";

class AdministratorRepository {

    private createEnderecoController
    private createCodigoDeAcessoController
    private administratorRepository: AdministratorRepository
    private accessCodeRepository: AccessCodeRepository

    public constructor (){
        this.createEnderecoController = createEnderecoController;
    }

    public async create (nome: string, cpf: number, email: string, telefone: number, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){
        
        await createEnderecoController.handle(cep, estado, cidade, bairro, rua, numero).then(async (endereco)=>{
            const enderecoId = endereco.id;
            await Administrator.create({nome, cpf, email, telefone, enderecoId});
        });
        
    }

    public async findByCpf (cpf: number) {
        const cpfExists = await Administrator.findOne({raw: true, attributes: ['cpf'], where: {
            cpf: cpf
        }});
        return cpfExists;
    }

    public async findByEmail (email: string) {
        const emailExists = await Administrator.findOne({raw: true, attributes: ['cpf'], where: {
            email: email
        }});
        return emailExists;
    }

    public async findByEmailAndSenha (email: string, senha: string) {
        const administrator = await Administrator.findOne({raw: true, attributes: ['nome', 'cpf', 'email', 'senha'], where: {
            email: email
        }});
        return administrator;
    }
}

export { AdministratorRepository };