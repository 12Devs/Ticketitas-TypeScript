//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link Administrator}
 */
import { Administrator } from "../models/Administrator";

/**
 * Class for handling the IO of database info
 * @date 5/8/2023 - 8:57:34 PM
 *
 * @class AdministratorRepository
 * @typedef {AdministratorRepository}
 */
class AdministratorRepository {
    
    /**
     * Declaration of the instance of this class (AdministratorRepository)
     * @date 5/8/2023 - 8:57:34 PM
     *
     * @private Marks this object as private
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository

    /**
     * Method for requesting the insertion of (a) new row(s) in the server database in order to store the information of a new administrator registry
     * @date 5/8/2023 - 8:57:34 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} name user name
     * @param {number} cpf user CPF number
     * @param {string} email user e-mail address
     * @param {number} phone user telephone number
     * @param {string} password user once-encrypted password hash
     * @returns {*}
     */
    public async create (name: string, cpf: number, email: string, phone: number, password: string){
        
        //Executes the database actions
        await Administrator.create({name, cpf, email, phone, password});
        
    }

    public async findOneAdministrator(cpf: number) {

        const AdministratorExists = await Administrator.findOne({raw: true,
            where: {
            cpf: cpf
        }});
        return AdministratorExists;
    }

    /**
     * Method for searching an administrator by their CPF number
     * @date 5/8/2023 - 8:57:34 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {number} cpf user CPF number
     * @returns {Array} Array of administrators found, matching the search (or none if no match is found)
     */
    public async findByCpf (cpf: number) {
        const cpfExists = await Administrator.findOne({raw: true, attributes: ['cpf'], where: {
            cpf: cpf
        }});
        return cpfExists;
    }

    /**
     * Method for searching an administrator by their e-mail address
     * @date 5/8/2023 - 8:57:34 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} email user e-mail address
     * @returns {Array} Array of administrators found, matching the search (or none if no match is found)
     */
    public async findByEmail (email: string) {
        const emailExists = await Administrator.findOne({raw: true, attributes: ['cpf'], where: {
            email: email
        }});
        return emailExists;
    }

    /**
     * Method for searching an administrator by their e-mail address and encrypted password matching
     * @date 5/8/2023 - 8:57:34 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} email user e-mail address
     * @param {string} password user once-encrypted password hash
     * @returns {Array} Array of administrators found, matching the search (or none if no match is found)
     */
    public async findByEmailAndSenha (email: string) {
        const administrator = await Administrator.findOne({raw: true, attributes: ['name', 'cpf', 'email', 'password'], where: {
            email: email
        }});
        return administrator;
    }

    public async findByCpfAndAvatar (cpf: number) {
        const cpfAndAvatar = await Administrator.findOne({raw: true, attributes: ['cpf', 'avatarImage'], where: {
            cpf: cpf
        }});
        return cpfAndAvatar;
    }

    public async findByCpfAndSenha (cpf: number) {
        const cpfAndSenha = await Administrator.findOne({raw: true, attributes: ['cpf', 'password'], where: {
            cpf: cpf
        }});
        return cpfAndSenha;
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
    
    public async updatePassword (cpf: number, newPassword: string){
        await Administrator.update({
            password: newPassword
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateCpf (cpf: number, newCpf: number){
        await Administrator.update({
            cpf: newCpf
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateName (cpf: number, newName: string){
        await Administrator.update({
            name: newName
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updateEmail (cpf: number, newEmail: string){
        await Administrator.update({
            email: newEmail
        },
        {
            where: {
                cpf: cpf
            }
        });
    }

    public async updatePhone (cpf: number, newPhone: number){
        await Administrator.update({
            phone: newPhone
        },
        {
            where: {
                cpf: cpf
            }
        });
    }
}

//Class export declarator
export { AdministratorRepository };