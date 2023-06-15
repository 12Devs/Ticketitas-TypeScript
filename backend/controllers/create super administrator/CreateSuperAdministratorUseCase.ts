//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the repository classes
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { SuperAdministratorRelationRepository} from "../../db/SuperAdministratorRelationRepository";

import bcrypt from 'bcrypt'; // Import of the bcrypt module (https://www.npmjs.com/package/bcrypt)
import { EmailProvider } from "../../utils/EmailProvider"; //Import of the EmailProvider class

/**
 * Class that contains the methods and procedures necessary to create a new administrator object and save its info in the database
 * @date 5/8/2023 - 7:12:30 PM
 *
 * @class CreateSuperAdministratorUseCase
 * @typedef {CreateSuperAdministratorUseCase}
 */
class CreateSuperAdministratorUseCase {

    /**
     * Creates an instance of {@link AdministratorRepository}
     * @date 5/8/2023 - 7:12:30 PM
     *
     * @private
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository

    /**
     * Creates an instance of {@link SuperAdministratorRelationRepository}
     * @date 5/8/2023 - 7:12:30 PM
     *
     * @private
     * @type {SuperAdministratorRelationRepository}
     */
    private superAdministratorRelationRepository: SuperAdministratorRelationRepository

    /**
     * Constructor for instances of {@link AdministratorRepository}, {@link emailProvider} and {@link SuperAdministratorRelationRepository}
     * @date 5/8/2023 - 7:12:30 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {AdministratorRepository} administratorRepository Private instance of the AdministratorRepository class
     * @param {AdministratorRepository} emailProvider Private instance of the EmailProvider class
     * @param {SuperAdministratorRelationRepository} superAdministratorRelationRepository Private instance of the SuperAdministratorRelationRepository class
     */
    constructor (administratorRepository: AdministratorRepository, emailProvider: EmailProvider, superAdministratorRelationRepository: SuperAdministratorRelationRepository) {
        this.administratorRepository =  administratorRepository;
        this.emailProvider = emailProvider;
        this.superAdministratorRelationRepository = superAdministratorRelationRepository;
    }

    /**
     * Creates an instance of {@link EmailProvider}
     * @date 5/18/2023 - 22:25:48 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {EmailProvider}
     */
    private emailProvider: EmailProvider;
    
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
    public async execute (name: string, cpf: number, email: string, phone: number, password: string) {
        
        var isThisLoopValid = true;

        //Not-null user name
        if (!name){
            isThisLoopValid = false;
        }

        //Not-null user CPF number
        if (!cpf){
            isThisLoopValid = false;
        }

        //Not-null user e-mail address
        if (!email){
            isThisLoopValid = false;
        }
        
        //Not-null user telephone number
        if (!phone){
            isThisLoopValid = false;
        }

        //Methods used to check the existence of the chosen CPF number and e-mail address in the database registry
        const cpfExists = await this.administratorRepository.findByCpf(cpf);
        const emailExists = await this.administratorRepository.findByEmail(email);
        
        //Conflicting user CPF number 
        if(cpfExists) {
            isThisLoopValid = false;
        }
        
        //Conflicting user e-mail address
        if(emailExists) {
            isThisLoopValid = false;
        }

        //Checks if the current administrator object can be created
        if(isThisLoopValid === true) {
            
            //Encryption of the password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            
            // Sends the information for the administrator repository class to work out the proccess of registering new info in the database
            await this.administratorRepository.create(name, cpf, email, phone, passwordHash);
            await this.superAdministratorRelationRepository.create(cpf);

            const emailInfo = {
                template: 'RegistrationConfirmationAdministrator',
                subject: `ADMINISTRATOR SUPER: Bem-vindo à Ticketitas!`
            }

            await this.emailProvider.sendEmail(email, emailInfo);
        }
    }
}

export { CreateSuperAdministratorUseCase as CreateSuperAdministratorUseCase }; //Class export declarator