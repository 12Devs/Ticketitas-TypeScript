//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";

import { ApiError } from "../../errors/ApiError"; //Import of the ApiError class

/**
 * Class for executing the proccess of updating an user phone number
 * @date 5/28/2023 - 3:55:15 AM
 *
 * @class UpdateUserPhoneUseCase
 * @typedef {UpdateUserPhoneUseCase}
 */
class UpdateUserPhoneUseCase {

    /**
     * Declares an instance of {@link ClientRepository}
     * @date 5/28/2023 - 3:55:15 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {ClientRepository}
     */
    private clientRepository: ClientRepository;
    /**
     * Declares an instance of {@link PromoterRepository}
     * @date 5/28/2023 - 3:55:15 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;
    /**
     * Declares an instance of {@link AdministratorRepository}
     * @date 5/28/2023 - 3:55:15 AM
     *
     * @private Marks this instance as having "private" visibility
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository;

    /**
     * Constructor for instances of {@link ClientRepository}, {@link PromoterRepository} and {@link AdministratorRepository}
     * @date 5/28/2023 - 3:55:15 AM
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
     * Method that updates and saves the new user address in the database
     * @date 5/28/2023 - 3:55:15 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} tipo Type of the user ("administrator", "client" or "promoter")
     * @param {number} cpf User CPF number
     * @param {number} newPhone User new phone number
     * @returns {*}
     */
    public async execute (tipo: string, cpf: number, newPhone: number){

        //Checks the type of user in order to communicate with the correct database repository
        if (tipo === "client"){
            
            //New phone number cannot be blank
            if(!newPhone) {
                throw new ApiError("O novo telefone não pode ser vazio!", 422);
            }
            
            const cpfClient: any = await this.clientRepository.findByCpf(cpf);

            await this.clientRepository.updatePhone(cpfClient.cpf, newPhone);
        } 
        else if (tipo === "promoter"){
            
            //New phone number cannot be blank
            if(!newPhone) {
                throw new ApiError("O novo telefone não pode ser vazio!", 422);
            }
            
            const cpfPromoter: any = await this.promoterRepository.findByCpf(cpf);

            await this.promoterRepository.updatePhone(cpfPromoter.cpf, newPhone);
        } 
        else if (tipo === "administrator"){
            
            //New phone number cannot be blank
            if(!newPhone) {
                throw new ApiError("O novo telefone não pode ser vazio!", 422);
            }
            
            const cpfAdministrator: any = await this.administratorRepository.findByCpf(cpf);

            await this.administratorRepository.updatePhone(cpfAdministrator.cpf, newPhone);
        } 
    }

}

export { UpdateUserPhoneUseCase }; //Class export declarator