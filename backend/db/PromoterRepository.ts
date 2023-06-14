import { Promoter } from '../models/Promoter';
import { CreateEnderecoUserController } from '../controllers/create user endereco/CreateEnderecoUserController';
import { createEnderecoUserController } from '../controllers/create user endereco/index';

/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 11:01:07 PM
 *
 * @class PromoterRepository
 * @typedef {PromoterRepository}
 */
class PromoterRepository {
    
    /**
     * Creates an instance of {@link PromoterRepository}.
     * @date 6/6/2023 - 11:01:52 PM
     *
     * @private
     * @type {CreateEnderecoUserController}
     */
    private createEnderecoUserController: CreateEnderecoUserController
    
    /**
     * Creates an instance of PromoterRepository.
     * @date 6/6/2023 - 11:01:57 PM
     *
     * @constructor
     * @public
     */
    public constructor (){
        this.createEnderecoUserController = createEnderecoUserController;
    }
    
    /**
     * Create a promoter
     * @date 6/6/2023 - 11:02:01 PM
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
            await Promoter.create({nome, cpf, email, telefone, senha, enderecoUserId});
        });
        
    }
    
    /**
     * Find a promoter
     * @date 6/6/2023 - 11:02:07 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findOnePromoter(cpf: number) {

        const promoterExists = await Promoter.findOne({raw: true,
            where: {
            cpf: cpf
        }});
        return promoterExists;
    }
    
    /**
     * find a promoter by cpf
     * @date 6/6/2023 - 11:02:13 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findByCpf (cpf: number) {
        const cpfExists = await Promoter.findOne({raw: true, attributes: ['cpf'], where: {
            cpf: cpf
        }});
        return cpfExists;
    }

    /**
     * find status a promoter by cpf
     * @date 7/6/2023 - 17:42:13 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findStatusByCpf (cpf: number) {
        const statusPromoter = await Promoter.findOne({raw: true, attributes: ['status'], where: {
            cpf: cpf
        }});
        return statusPromoter;
    }

        /**
     * find status a promoter by cpf
     * @date 7/6/2023 - 17:42:13 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
        public async findAllPromoters () {
            const allPromoters = await Promoter.findAll({raw: true});
            return allPromoters;
        }
    
    /**
     * find a promoter by email
     * @date 6/6/2023 - 11:02:40 PM
     *
     * @public
     * @async
     * @param {string} email
     * @returns {unknown}
     */
    public async findByEmail (email: string) {
        const emailExists = await Promoter.findOne({raw: true, attributes: ['cpf'], where: {
            email: email
        }});
        return emailExists;
    }
    
    /**
     * find promoter infod by email
     * @date 6/6/2023 - 11:02:45 PM
     *
     * @public
     * @async
     * @param {string} email
     * @returns {unknown}
     */
    public async findInfosByEmail (email: string) {
        const promoter = await Promoter.findOne({raw: true,
            where: {
                email: email
            }});
        return promoter;
    }
    
    /**
     * find promoter by email and senha
     * @date 6/6/2023 - 11:02:57 PM
     *
     * @public
     * @async
     * @param {string} email
     * @returns {unknown}
     */
    public async findByEmailAndSenha (email: string) {
        const promoter = await Promoter.findOne({raw: true, attributes: ['nome', 'cpf', 'email', 'senha'],
            where: {
                email: email
            }});
        return promoter;
    }
    
    /**
     * find promoter by cpf and avatar
     * @date 6/6/2023 - 11:03:14 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findByCpfAndAvatar (cpf: number) {
        const cpfAndAvatar = await Promoter.findOne({raw: true, attributes: ['cpf', 'avatarImage'], where: {
            cpf: cpf
        }});
        return cpfAndAvatar;
    }
    
    /**
     * find promoter by cpf and senha
     * @date 6/6/2023 - 11:03:22 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findByCpfAndSenha (cpf: number) {
        const cpfAndSenha = await Promoter.findOne({raw: true, attributes: ['cpf', 'senha'], where: {
            cpf: cpf
        }});
        return cpfAndSenha;
    }
    
    /**
     * update avatar
     * @date 6/6/2023 - 11:03:32 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {*} avatarImage
     * @returns {*}
     */
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
    
    /**
     * update status registration
     * @date 6/6/2023 - 11:03:38 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {*}
     */
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
    
    /**
     * update status
     * @date 6/6/2023 - 11:03:44 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {boolean} newStatus
     * @returns {*}
     */
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
    
    /**
     * update password
     * @date 6/6/2023 - 11:03:50 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {string} newPassword
     * @returns {*}
     */
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
    
    /**
     * update cpf
     * @date 6/6/2023 - 11:03:55 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {number} newCpf
     * @returns {*}
     */
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
    
    /**
     * update name
     * @date 6/6/2023 - 11:03:59 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {string} newName
     * @returns {*}
     */
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
    
    /**
     * update email
     * @date 6/6/2023 - 11:04:03 PM
     *
     * @public
     * @async
     * @param {string} email
     * @param {string} newEmail
     * @returns {*}
     */
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
    
    /**
     * update address
     * @date 6/6/2023 - 11:04:07 PM
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
    
    /**
     * update phone
     * @date 6/6/2023 - 11:04:13 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {number} newPhone
     * @returns {*}
     */
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