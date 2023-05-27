//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link AdministratorRepository}
 */
import { AdministratorRepository } from "../../db/AdministratorRepository";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/ApiError";
/**
 * Import of the {@link https://www.npmjs.com/package/randomstring randomstring} module
 */
import randomstring from 'randomstring';
/**
 * Import of the class {@link SendEmail}
 */
import { SendEmail } from "../../utils/SendEmail";
/**
 * Import of the {@link https://www.npmjs.com/package/bcrypt bcrypt} module
 */import bcrypt from 'bcrypt';

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
     * Creates an instance of {@link SendEmail}
     * @date 5/18/2023 - 22:25:48 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {SendEmail}
     */
    private sendEmail: SendEmail;

    /**
     * Constructor for instances of {@link AdministratorRepository}
     * @date 5/8/2023 - 7:12:30 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {AdministratorRepository} administratorRepository Private instance of the AdministratorRepository class
     */
    constructor (administratorRepository: AdministratorRepository, sendEmail: SendEmail) {
        this.administratorRepository =  administratorRepository;
        this.sendEmail = sendEmail;
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
            throw new ApiError("O telefone é obrigatório!", 422);
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

        //Encryption of the password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        
        // Sends the information for the administrator repository class to work out the proccess of registering new info in the database
        await this.administratorRepository.create(name, cpf, email, phone, passwordHash);

        //Message subject text
        const subject = "BEM-VINDO, ADMINISTRADOR";
        //Message description text
        const message = (`  Caro ${name}:\n\nComo é procedimento padrão aos novos administradores regulares, sua conta foi associado a uma senha temporária aleatória. Por favor, utilize a função de alteração da senha por email para escolher uma senha pessoal;\n\n      Atenciosamente, Equipe Ticketitas.`);

        //Sends information for the "sendEmail" util method to forward the message
        await this.sendEmail.sendEmail(email, subject, message);
    }
}

//Class export declarator
export { CreateAdministratorUseCase as CreateAdministratorUseCase };