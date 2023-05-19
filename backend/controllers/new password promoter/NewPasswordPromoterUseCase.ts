//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

/**
 * Import of the class {@link PromoterPasswordChangeCodeRepository}
 */
import { PromoterPasswordChangeCodeRepository } from "../../db/PromoterPasswordChangeCodeRepository";
/**
 * Import of the class {@link PromoterRepository}
 */
import { PromoterRepository } from "../../db/PromoterRepository";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/ApiError";
/**
 * Import of the {@link https://www.npmjs.com/package/bcrypt randomstring} module
 */
import bcrypt from 'bcrypt';

/**
 * Class that contains the methods and procedures necessary to authenticate a password change code and new the related password
 * @date 5/17/2023 1:28:33 AM
 *
 * @class NewPasswordPromoterUseCase
 * @typedef {NewPasswordPromoterUseCase}
 */
class NewPasswordPromoterUseCase {

    /**
     * Creates an instance of {@link PromoterPasswordChangeCodeRepository}
     * @date 5/17/2023 - 1:31:37 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {PromoterPasswordChangeCodeRepository}
     */
    private promoterPasswordChangeCodeRepository: PromoterPasswordChangeCodeRepository;

    /**
     * Creates an instance of {@link PromoterRepository}
     * @date 5/17/2023 - 1:31:37 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;

    /**
     * Constructor for instances of {@link PromoterRepository}
     * @date @date 5/17/2023 - 1:32:27 AM
     *
     * @constructor Marks this part of the code as a constructor
     * @param {PromoterRepository} promoterRepository Private instance of the PromoterRepository class
     */
    constructor (promoterRepository: PromoterRepository) {
        this.promoterRepository =  promoterRepository;
    }

    /**
     * Method for executing the sending of an e-mail message with a password new link using the email parameter supplied by its controller
     * @date @date 5/17/2023 - 1:33:04 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} email user e-mail address
     * @returns {*}
     */
    public async execute (userPasswordChangeCode: string, newPassword: string, newPasswordConfirmation: string) {

        //Confirmation matches the first entry
        if (newPassword !== newPasswordConfirmation){
            throw new ApiError("As senhas nao coincidem!", 422);
        }

        //Method used to check the validity of the password change code
        const codeInfo: any = await this.promoterPasswordChangeCodeRepository.findByCode(userPasswordChangeCode);
        
        //Valid password change code
        if (!codeInfo){
            throw new ApiError("Codigo de mudanca de senha invalido!", 422);
        }

        //Obtaining the CPF number of the user that will have the password changed
        const userCpf = codeInfo.cpf;
        
        //Encrypting operations
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        //Sends information for the promoter repository to change the password
        await this.promoterRepository.updatePassword(userCpf, passwordHash);

        //Removes the update code from the database
        await this.promoterPasswordChangeCodeRepository.destroyByCode(userPasswordChangeCode);
    }
}

//Class export declarator
export { NewPasswordPromoterUseCase as NewPasswordPromoterUseCase };