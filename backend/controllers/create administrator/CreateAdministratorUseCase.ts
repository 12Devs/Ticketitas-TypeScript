//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the repository classes
import { AdministratorRepository } from "../../db/AdministratorRepository";
import { SuperAdministratorRelationRepository } from "../../db/SuperAdministratorRelationRepository";

//Import of the EmailProvider and ApiError APIs
import { EmailProvider } from "../../utils/EmailProvider";
import { ApiError } from "../../errors/ApiError";

//Import of the randomstring and bcrypt modules
import randomstring from 'randomstring';
import bcrypt from 'bcrypt';

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
    private emailProvider: EmailProvider;

    /**
     * Creates an instance of {@link SuperAdministratorRelationRepository}
     * @date 5/18/2023 - 22:25:48 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {SuperAdministratorRelationRepository}
     */
    private superAdministratorRelationRepository: SuperAdministratorRelationRepository;

    /**
     * Constructor for instances of {@link AdministratorRepository}, {@link SendEmail} and {@link SuperAdministratorRelationRepository}
     * @date 5/8/2023 - 7:12:30 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {AdministratorRepository} administratorRepository Private instance of the AdministratorRepository class
     * @param {SendEmail} sendEmail Private instance of the SendEmail class
     * @param {SuperAdministratorRelationRepository} superAdministratorRelationRepository Private instance of the SuperAdministratorRelationRepository class
     */
    constructor (administratorRepository: AdministratorRepository, emailProvider: EmailProvider, superAdministratorRelationRepository: SuperAdministratorRelationRepository) {
        this.administratorRepository =  administratorRepository;
        this.emailProvider = emailProvider;
        this.superAdministratorRelationRepository = superAdministratorRelationRepository;
    }
    
    /**
     * Method for executing the creation of an administrator object using the parameters supplied by its controller
     * @date 5/8/2023 - 7:12:30 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} name user full name
     * @param {number} cpf user cpf number
     * @param {string} email user e-mail address
     * @param {number} phone user telephone number
     * @returns {string}
     */
    public async execute (name: string, newAdminCpf: number, email: string, phone: number) {
        
        //Type of user is "administrator"
        // if (tipo !== "administrator") {
        //     throw new ApiError("Esta tarefa só pode ser executada por administradores autorizados!", 422);
        // }

        //Look for the logged-in administrator CPF in the "super admin" table
        // const superAdministrator = await this.superAdministratorRelationRepository.findByCpf(superAdminCpf);
        
        // if(!superAdministrator) {
        //     throw new ApiError("Administradores regulares não estão autorizados a cadastrar novos administradores!", 422);
        // }

        //Not-null user name
        if (!name){
            throw new ApiError("O nome é obrigatório!", 422);
        }

        //Not-null user CPF number
        if (!newAdminCpf){
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
        const cpfExists = await this.administratorRepository.findByCpf(newAdminCpf);
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
        await this.administratorRepository.create(name, newAdminCpf, email, phone, passwordHash);

        const emailInfo = {
            template: 'RegistrationConfirmationAdministrator',
            subject: `ADMINISTRATOR: Bem-vindo à Ticketitas!`
        }

        await this.emailProvider.sendEmail(email, emailInfo);

        const newAdministrator = {
            name: name,
            email: email,
            password: password
        }

        return { newAdministrator };
    }
}

//Class export declarator
export { CreateAdministratorUseCase };