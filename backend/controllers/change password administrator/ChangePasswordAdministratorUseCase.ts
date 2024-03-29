//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link AdministratorRepository}
 */
import { AdministratorRepository } from "../../db/AdministratorRepository";
/**
 * Import of the class {@link AdministratorPasswordChangeCodeRepository}
 */
import { AdministratorPasswordChangeCodeRepository } from "../../db/AdministratorPasswordChangeCodeRepository";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/ApiError";
/**
 * Import of the class {@link SendEmail}
 */
import { SendEmail } from "../../utils/SendEmail";

/**
 * Class that contains the methods and procedures necessary to send an email with the link with which an user can change their password
 * @date 5/12/2023 4:48:07 PM
 *
 * @class ChangePasswordAdministratorUseCase
 * @typedef {ChangePasswordAdministratorUseCase}
 */
class ChangePasswordAdministratorUseCase {

    /**
     * Creates an instance of {@link AdministratorRepository}
     * @date 5/12/2023 - 4:50:47 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository;

     /**
     * Creates an instance of {@link AdministratorPasswordChangeCodeRepository}
     * @date 5/17/2023 - 4:05:07 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {AdministratorPasswordChangeCodeRepository}
     */
     private administratorPasswordChangeCodeRepository: AdministratorPasswordChangeCodeRepository;
    
    /**
     * Creates an instance of {@link SendEmail}
     * @date 5/12/2023 - 4:52:03 PM
     *
     * @private Marks this instance as having "private" visibility
     * @type {SendEmail}
     */
    private sendEmail: SendEmail;

    /**
     * Constructor for instances of {@link AdministratorRepository}
     * @date 5/12/2023 - 4:59:48 PM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {AdministratorRepository} administratorRepository Private instance of the AdministratorRepository class
     */
    constructor (administratorRepository: AdministratorRepository, administratorPasswordChangeCodeRepository: AdministratorPasswordChangeCodeRepository, sendEmail: SendEmail) {
        this.administratorRepository =  administratorRepository;
        this.administratorPasswordChangeCodeRepository = administratorPasswordChangeCodeRepository;
        this.sendEmail = sendEmail;
    }

    /**
     * Method for executing the sending of an e-mail message with a password change link using the email parameter supplied by its controller
     * @date 5/12/2023 - 4:57:30 PM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} email user e-mail address
     * @returns {*}
     */
    public async execute (email: string) {
        
        //Not-null e-mail address
        if (!email){
            throw new ApiError("Insira um endereco de email!", 422);
        }

        //Method used to check the existence of the chosen e-mail address in the database registry
        const emailExists:any = await this.administratorRepository.findByEmail(email);
        
        //Invalid user e-mail address
        if(!emailExists) {
            throw new ApiError("Endereco de e-mail nao consta no sistema!", 422);
        }
        
        //Random code obtained from the password change code repository
        const randomCode = await this.administratorPasswordChangeCodeRepository.generateUniqueCode();

        console.log("AQUIII: ", randomCode);
        //Message subject text
        const subject = "PEDIDO DE ALTERAÇÃO DA SENHA DO ADMINISTRADOR RECEBIDO";
        //Message description text
        const message = (`O código para alteração da sua senha é: ${randomCode}`);

        //Sends information for the "sendEmail" util method to forward the message
        await this.sendEmail.sendEmail(email, subject, message);

        const cpfOfTheEmail = emailExists.cpf;

        //Method used to check if a code is already registered for the cpf
        const cpfForTheEmailExists = await this.administratorPasswordChangeCodeRepository.findByCpf(cpfOfTheEmail);

        //Conditional for existing or non-existing password change code registry
        if(!cpfForTheEmailExists) {
            
            //Creation of a new entry
            this.administratorPasswordChangeCodeRepository.create(randomCode, cpfOfTheEmail);
        }
        else{
            //Updating of an existing one
            this.administratorPasswordChangeCodeRepository.updateCode(randomCode);
        }
    }
}

//Class export declarator
export { ChangePasswordAdministratorUseCase as ChangePasswordAdministratorUseCase };