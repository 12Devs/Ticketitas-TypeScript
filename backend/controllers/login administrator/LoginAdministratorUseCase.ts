//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link AdministratorRepository}
 */
import { AdministratorRepository } from "../../db/AdministratorRepository";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/api.errors";
/**
 * Import of the {@link https://www.npmjs.com/package/bcrypt bcrypt} module
 */
import bcrypt from "bcrypt";

/**
 * Class that contains the methods and procedures necessary to authenticate a administrator type of user
 * @date 5/8/2023 - 8:03:23 PM
 *
 * @class LoginAdministratorUseCase
 * @typedef {LoginAdministratorUseCase}
 */
class LoginAdministratorUseCase {

    /**
     * Description placeholder
     * @date 5/8/2023 - 8:03:23 PM
     *
     * @private
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository

    /**
     * Creates an instance of {@linkLoginAdministratorUseCase}
     * @date 5/8/2023 - 8:03:23 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {AdministratorRepository} administratorRepository Private instance of the AdministratorRepository class
     */
    constructor (administratorRepository: AdministratorRepository) {
        this.administratorRepository = administratorRepository;
    }

    /**
     * Method for executing the authentication of an administrator user using the parameters supplied by its controller
     * @date 5/8/2023 - 8:03:23 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} email user e-mail address
     * @param {string} password user once-encrypted password
     * @returns {administrator} basic administrator object as it is defined by this method
     */
    public async execute (email: string, password: string) {
        
        //Not-null e-mail address
        if (!email){
            throw new ApiError("O email é obrigatório", 422);
        }

        //Not-null password
        if (!password){
            throw new ApiError("A senha é obrigatória", 422);
        }

        //Checks the existence of an user with that e-mail in the system and returns an info table for the request
        const infoAdministrator = await this.administratorRepository.findByEmailAndSenha(email, password);
        
        //User exists
        if (infoAdministrator === null || infoAdministrator === undefined) {
            throw new ApiError("Email ou senha incorretos", 422);
        }
        
        //User search must not return invalid data
        if (infoAdministrator.email !== email) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        //Comparing the stored hash with the once-encrypted password received
        const checkSenha = bcrypt.compareSync(password, infoAdministrator.password);

        //User password should match
        if (!checkSenha) {
            throw new ApiError("Email ou senha incorretos", 422);
        }

        /**
         * Constructor for the basic administrator object to be returned
         * @param {string} name user name
         * @param {number} cpf user CPF number
         * @param {string} email user e-mail address
        */
        const administrator = {
            name: infoAdministrator.name,
            cpf: infoAdministrator.cpf,
            email: infoAdministrator.email
        }
        
        //Returning the basic object created
        return {administrator}
    }
}

//Class export declarator
export { LoginAdministratorUseCase };