import { createEnderecoUserController } from "../controllers/create user endereco/index";
import { CreateEnderecoUserController } from "../controllers/create user endereco/CreateEnderecoUserController";
import { Administrator } from "../models/Administrator";


class AdministratorRepository {




    private createEnderecoUserController: CreateEnderecoUserController

    public constructor (){
        this.createEnderecoUserController = createEnderecoUserController;
    }




    public async create (nome: string, cpf: number, email: string, telefone: number, senha: string){
        
        //await this.createEnderecoUserController.handle(cep, estado, cidade, bairro, rua, numero).then(async (enderecoUser: any)=>{
            
            await Administrator.create({nome, cpf, email, telefone, senha});
        
        
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
        const client = await Administrator.findOne({raw: true, attributes: ['nome', 'cpf', 'email', 'senha'], where: {
            email: email
        }});
        return client;
    }

    
    public async findByCpfAndAvatar (cpf: number) {
        const cpfAndAvatar = await Administrator.findOne({raw: true, attributes: ['cpf', 'avatarImage'], where: {
            cpf: cpf
        }});
        return cpfAndAvatar;
    }

    public async updateAvatar (cpf: number, avatarImage: any){
        await Administrator.update({
            avatarImage: avatarImage
        },
        {
            where: {
                cpf: cpf
            }
        });
    }



    



}

export { AdministratorRepository };