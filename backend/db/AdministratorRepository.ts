//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link CreateEnderecoController}
 */
import { CreateEnderecoController } from "../controllers/create endereco/CreateEnderecoController";
/**
 * Import of the instance {@link createEnderecoController}
 */
import { createEnderecoController } from "../controllers/create endereco/index";
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
     * Declaration of the {@link createEnderecoController} instance
     * @date 5/8/2023 - 8:57:34 PM
     *
     * @private Marks this object as private
     * @type {createEnderecoController}
     */
    private createEnderecoController
    
    /**
     * Declaration of the instance of this class (AdministratorRepository)
     * @date 5/8/2023 - 8:57:34 PM
     *
     * @private Marks this object as private
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository

    /**
     * Creates an instance of AdministratorRepository
     * @date 5/8/2023 - 8:57:34 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this constructor as having "public" visibility
     */
    public constructor (){
        this.createEnderecoController = createEnderecoController;
    }

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
        await Administrator.create({name, cpf, email, phone});
        
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
    public async findByEmailAndSenha (email: string, password: string) {
        const administrator = await Administrator.findOne({raw: true, attributes: ['name', 'cpf', 'email', 'password'], where: {
            email: email
        }});
        return administrator;
    }
}

//Class export declarator
export { AdministratorRepository };