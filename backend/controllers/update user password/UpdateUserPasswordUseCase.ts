//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository"; 
import { AdministratorRepository } from "../../db/AdministratorRepository";

import bcrypt from "bcrypt"; //Import of the bcrypt module (https://www.npmjs.com/package/bcrypt)
import { ApiError } from "../../errors/ApiError"; //Import of the ApiError class

/**
 * Class for executing the proccess of updating an user password
 * @date 5/28/2023 - 4:14:23 AM
 *
 * @class UpdateUserPasswordUseCase
 * @typedef {UpdateUserPasswordUseCase}
 */
class UpdateUserPasswordUseCase {

    /**
     * Declares an instance of {@link ClientRepository}
     * @date 5/28/2023 - 4:14:23 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {ClientRepository}
     */
    private clientRepository: ClientRepository;
    /**
     * Declares an instance of {@link PromoterRepository}
     * @date 5/28/2023 - 4:14:23 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;
    /**
     * Declares an instance of {@link AdministratorRepository}
     * @date 5/28/2023 - 4:14:23 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository;

    /**
     * Constructor for instances of {@link ClientRepository}, {@link PromoterRepository} and {@link AdministratorRepository}
     * @date 5/28/2023 - 4:14:23 AM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this method as having "public" visibility
     * @param {ClientRepository} clientRepository
     * @param {PromoterRepository} promoterRepository
     * @param {AdministratorRepository} administratorRepository
     */
    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository, administratorRepository: AdministratorRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
        this.administratorRepository = administratorRepository;
    }

    /**
     * Method for updating and saving a new user password in the database
     * @date 5/28/2023 - 4:14:23 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} tipo Type of the user ("administrator", "client" or "promoter")
     * @param {number} cpf User CPF number
     * @param {string} passwordAuth current password needed to verify the identity of the user
     * @param {string} newPassword New user password
     * @param {string} newPasswordConfirmation Confirmation of the new password
     * @returns {*}
     */
    public async execute (tipo: string, cpf: number, passwordAuth: string, newPassword: string, newPasswordConfirmation: string){
        
        //New password cannot be blank
        if(!newPassword) {
            throw new ApiError("A nova senha não pode ser vazia!", 422);
        }

        //New password confirmation cannot be blank
        if(!newPasswordConfirmation) {
            throw new ApiError("É necessário confirmar sua nova senha!", 422);
        }

        //The new password and its confirmation need to be a perfect match
        if(newPassword !== newPasswordConfirmation) {
            throw new ApiError("A senha não coincide com sua confirmação!", 422);
        }

        //Checks the type of user in order to communicate with the correct database repository
        if (tipo === "client"){
            const cpfClient: any = await this.clientRepository.findByCpfAndSenha(cpf); //Recovers the administrator object with the provided cpf
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfClient.senha); //Checks if the encrypted password matches

            //The password used to authorize the action must be valid
            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }

            //Encryption of the password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(newPassword, salt);
            
            await this.clientRepository.updatePassword(cpfClient.cpf, passwordHash);
        } 
        else if (tipo === "promoter"){
            const cpfPromoter: any = await this.promoterRepository.findByCpfAndSenha(cpf); //Recovers the administrator object with the provided cpf
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfPromoter.senha); //Checks if the encrypted password matches

            //The password used to authorize the action must be valid
            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }

            //Encryption of the password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(newPassword, salt);
            
            await this.promoterRepository.updatePassword(cpfPromoter.cpf, passwordHash);
        } 
        else if (tipo === "administrator"){
            const cpfAdministrator: any = await this.administratorRepository.findByCpfAndSenha(cpf); //Recovers the administrator object with the provided cpf
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfAdministrator.password); //Checks if the encrypted password matches

            //The password used to authorize the action must be valid
            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }

            
            //Encryption of the password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(newPassword, salt);
            
            await this.administratorRepository.updatePassword(cpfAdministrator.cpf, passwordHash);
        } 
    }

}

export { UpdateUserPasswordUseCase }; //Class export declarator