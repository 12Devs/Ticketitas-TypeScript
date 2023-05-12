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
 * Import of the {@link https://www.npmjs.com/package/randomstring randomstring} module
 */
import randomstring from 'node-randomstring';

/**
 * Class that contains the methods and procedures necessary to create a new administrator object and save its info in the database
 * @date 5/8/2023 - 7:12:30 PM
 *
 * @class CreateAdministratorUseCase
 * @typedef {CreateAdministratorUseCase}
 */
class CreateAdministratorUseCase {

    /**
     * Creates an instance of {@link AdministratorRepository}
     * @date 5/8/2023 - 7:12:30 PM
     *
     * @private
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository

    /**
     * Constructor for instances of {@link AdministratorRepository}
     * @date 5/8/2023 - 7:12:30 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {AdministratorRepository} administratorRepository Private instance of the AdministratorRepository class
     */
    constructor (administratorRepository: AdministratorRepository) {
        this.administratorRepository =  administratorRepository;
    }
    
    /**
     * Method for executing the creation of an administrator object using the parameters supplied by its controller
     * @date 5/8/2023 - 7:12:30 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} name user full name
     * @param {number} cpf "CPF" (Brazilian national Physical Person Registry) number of the citizen that is to be registered as a new user
     * @param {string} email user e-mail address
     * @param {number} phone user telephone number
     * @returns {*}
     */
    public async execute (name: string, cpf: number, email: string, phone: number) {
        
        //Not-null user name
        if (!name){
            throw new ApiError("O name é obrigatório!", 422);
        }

        //Not-null user CPF number
        if (!cpf){
            throw new ApiError("O cpf é obrigatório!", 422);
        }

        //Not-null user e-mail address
        if (!email){
            throw new ApiError("O email é obrigatório!", 422);
        }

        //Not-null user telephone number
        if (!phone){
            throw new ApiError("O phone é obrigatório!", 422);
        }

        //Methods used to check the existence of the chosen CPF number and e-mail address in the database registry
        const cpfExists = await this.administratorRepository.findByCpf(cpf);
        const emailExists = await this.administratorRepository.findByEmail(email);
        
        //Conflicting user CPF number 
        if(cpfExists) {
            throw new ApiError("Utilize outro cpf", 422);
        }
        
        //Conflicting user e-mail address
        if(emailExists) {
            throw new ApiError("Utilize outro email", 422);
        }

        //Usage of the "generate" method of the "randomstring" module in order to obtain a 32 character-long random temporary password
        const password = await randomstring.generate(32);

        // Sends the information for the administrator repository class to work out the proccess of registering new info in the database
        await this.administratorRepository.create(name, cpf, email, phone, password);
    }
}

//Class export declarator
export { CreateAdministratorUseCase as CreateAdministratorUseCase };