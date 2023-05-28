//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository"; 
import { AdministratorRepository } from "../../db/AdministratorRepository";

import bcrypt from "bcrypt"; //Import of the bcrypt module (https://www.npmjs.com/package/bcrypt)
import { ApiError } from "../../errors/ApiError"; //Import of the ApiError class

/**
 * Class for executing the proccess of updating an user email address
 * @date 5/28/2023 - 1:41:35 AM
 *
 * @class UpdateUserEmailUseCase
 * @typedef {UpdateUserEmailUseCase}
 */
class UpdateUserEmailUseCase {

    /**
     * Declares an instance of {@link ClientRepository}
     * @date 5/28/2023 - 1:41:35 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {ClientRepository}
     */
    private clientRepository: ClientRepository;
    /**
     * Declares an instance of {@link PromoterRepository}
     * @date 5/28/2023 - 1:41:35 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;
    /**
     * Declares an instance of {@link AdministratorRepository}
     * @date 5/28/2023 - 1:41:35 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository;

    /**
     * Constructor for instances of {@link ClientRepository}, {@link PromoterRepository} and {@link AdministratorRepository}
     * @date 5/28/2023 - 1:41:35 AM
     *
     * @constructor Marks this part of the code as a constructor
     * @public Marks this constructor as having "public" visibility
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
     * Method for updating and saving a new user email address in the database
     * @date 5/28/2023 - 1:41:35 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} tipo Type of the user ("administrator", "client" or "promoter")
     * @param {number} cpf User CPF number
     * @param {string} passwordAuth Current password needed to verify the identity of the user
     * @param {string} newEmail New email address
     * @param {string} newEmailConfirmation Confirmation of the new email address
     * @returns {*}
     */
    public async execute (tipo: string, cpf: number, passwordAuth: string, newEmail: string, newEmailConfirmation: string){

        //New email address cannot be blank
        if(!newEmail) {
            throw new ApiError("O novo endereço de email não pode ser vazio!", 422);
        }

        //New email address confirmation cannot be blank
        if(!newEmailConfirmation) {
            throw new ApiError("É necessário confirmar seu novo endereço de email!", 422);
        }

        //The new email and its confirmation need to be a perfect match
        if(newEmail !== newEmailConfirmation) {
            throw new ApiError("O endereço de email não coincide com sua confirmação!", 422);
        }

        //Checks the type of user in order to communicate with the correct database repository
        if (tipo === "client"){
            const emailClient: any = await this.clientRepository.findByEmail(newEmail);

            //The new email address should not be registered already
            if(emailClient !== null && emailClient !== undefined) {
                throw new ApiError("Utilize outro email", 422);
            }

            const cpfClient: any = await this.clientRepository.findByCpfAndSenha(cpf); //Recovers the administrator object with the provided cpf
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfClient.senha); //Checks if the encrypted password matches

            //The password used to authorize the action must be valid
            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }
            
            await this.clientRepository.updateEmail(cpfClient.cpf, newEmail);
        } 
        else if (tipo === "promoter"){
            const emailPromoter: any = await this.promoterRepository.findByEmail(newEmail);

            //The new email address should not be registered already
            if(emailPromoter !== null && emailPromoter !== undefined) {
                throw new ApiError("Utilize outro email", 422);
            }

            const cpfPromoter: any = await this.promoterRepository.findByCpfAndSenha(cpf); //Recovers the administrator object with the provided cpf
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfPromoter.senha); //Checks if the encrypted password matches

            //The password used to authorize the action must be valid
            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }
            
            await this.promoterRepository.updateEmail(cpfPromoter.cpf, newEmail);
        } 
        else if (tipo === "administrator"){
            const emailAdministrator: any = await this.administratorRepository.findByEmailAndSenha(newEmail);

            //The new email address should not be registered already
            if(emailAdministrator !== null && emailAdministrator !== undefined) {
                throw new ApiError("Utilize outro email", 422);
            }

            const cpfAdministrator: any = await this.administratorRepository.findByCpfAndSenha(cpf); //Recovers the administrator object with the provided cpf
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfAdministrator.password); //Checks if the encrypted password matches

            //The password used to authorize the action must be valid
            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }
            
            await this.administratorRepository.updateEmail(cpfAdministrator.cpf, newEmail);
        } 
    }

}

export { UpdateUserEmailUseCase }; //Class export declarator