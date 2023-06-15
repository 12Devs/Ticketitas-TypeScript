import { createEnderecoUserController } from "../controllers/create user endereco/index";
import { CreateEnderecoUserController } from "../controllers/create user endereco/CreateEnderecoUserController";
import { Client } from "../models/Client";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 10:51:46 PM
 *
 * @class ClientRepository
 * @typedef {ClientRepository}
 */
class ClientRepository {
    
    /**
     * Creates an instance of {@link ClientRepository}.
     * @date 6/6/2023 - 10:51:53 PM
     *
     * @private
     * @type {CreateEnderecoUserController}
     */
    private createEnderecoUserController: CreateEnderecoUserController
    
    /**
     * Creates an instance of ClientRepository.
     * @date 6/6/2023 - 10:51:57 PM
     *
     * @constructor
     * @public
     */
    public constructor (){
        this.createEnderecoUserController = createEnderecoUserController;
    }
    
    /**
     * Create a client
     * @date 6/6/2023 - 10:52:01 PM
     *
     * @public
     * @async
     * @param {string} nome
     * @param {number} cpf
     * @param {string} email
     * @param {number} telefone
     * @param {string} senha
     * @param {number} cep
     * @param {string} estado
     * @param {string} cidade
     * @param {string} bairro
     * @param {string} rua
     * @param {number} numero
     * @returns {*}
     */
    public async create (nome: string, cpf: number, email: string, telefone: number, senha: string, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){
        
        await this.createEnderecoUserController.handle(cep, estado, cidade, bairro, rua, numero).then(async (enderecoUser: any)=>{
            const enderecoUserId = enderecoUser.id;
            await Client.create({nome, cpf, email, telefone, senha, enderecoUserId});
        });
        
    }
    
    /**
     * Find one client
     * @date 6/6/2023 - 10:52:07 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findOneClient(cpf: number) {

        const clientExists = await Client.findOne({raw: true,
            where: {
            cpf: cpf
        }});
        return clientExists;
    }
    
    /**
     * Find one client by cpf
     * @date 6/6/2023 - 10:52:24 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findByCpf (cpf: number) {
        const cpfExists = await Client.findOne({raw: true, attributes: ['cpf'], where: {
            cpf: cpf
        }});
        return cpfExists;
    }
    
    /**
     * Find one client by email
     * @date 6/6/2023 - 10:52:54 PM
     *
     * @public
     * @async
     * @param {string} email
     * @returns {unknown}
     */
    public async findByEmail (email: string) {
        const emailExists = await Client.findOne({raw: true, attributes: ['cpf'], where: {
            email: email
        }});
        return emailExists;
    }
    
    /**
     * Find one client by email and senha
     * @date 6/6/2023 - 10:52:59 PM
     *
     * @public
     * @async
     * @param {string} email
     * @returns {unknown}
     */
    public async findByEmailAndSenha (email: string) {
        const client = await Client.findOne({raw: true, attributes: ['nome', 'cpf', 'email', 'senha'], where: {
            email: email
        }});
        return client;
    }

    
    /**
     * Find one client by cpf and avatar
     * @date 6/6/2023 - 10:53:05 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findByCpfAndAvatar (cpf: number) {
        const cpfAndAvatar = await Client.findOne({raw: true, attributes: ['cpf', 'avatarImage'], where: {
            cpf: cpf
        }});
        return cpfAndAvatar;
    }
    
    /**
     * Find one client by cpf and senha
     * @date 6/6/2023 - 10:53:09 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findByCpfAndSenha (cpf: number) {
        const cpfAndSenha = await Client.findOne({raw: true, attributes: ['cpf', 'senha'], where: {
            cpf: cpf
        }});
        return cpfAndSenha;
    }
    
    /**
     * Update avatar
     * @date 6/6/2023 - 10:53:14 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {*} avatarImage
     * @returns {*}
     */
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
    
    /**
     * Update password
     * @date 6/6/2023 - 10:53:55 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {string} newPassword
     * @returns {*}
     */
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
    
    /**
     * Update cpf
     * @date 6/6/2023 - 10:54:00 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {number} newCpf
     * @returns {*}
     */
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
    
    /**
     * Update name
     * @date 6/6/2023 - 10:54:04 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {string} newName
     * @returns {*}
     */
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
    
    /**
     * Update email
     * @date 6/6/2023 - 10:54:08 PM
     *
     * @public
     * @async
     * @param {string} email
     * @param {string} newEmail
     * @returns {*}
     */
    public async updateEmail (cpf: number, newEmail: string){
        await Client.update({
            email: newEmail
        },
        {
            where: {
                cpf: cpf
            }
        });
    }
    
    /**
     * Update address
     * @date 6/6/2023 - 10:54:12 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {number} cep
     * @param {string} cidade
     * @param {string} estado
     * @param {string} bairro
     * @param {string} rua
     * @param {number} numero
     * @returns {*}
     */
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
    
    /**
     * Update phone
     * @date 6/6/2023 - 10:54:19 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {number} newPhone
     * @returns {*}
     */
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