//Most of the variables and some of the text used to document this file were auto-generated using {@link https://marketplace.visualstudio.com/items?itemName=crystal-spider.jsdoc-generator JSDoc Generator by Crystal Spider}

//Import of the repository classes
import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";

import { ApiError } from "../../errors/ApiError"; //Import of the ApiError class

/**
 * Class for executing the proccess of updating an user name
 * @date 5/28/2023 - 3:39:02 AM
 *
 * @class UpdateUserNameUseCase
 * @typedef {UpdateUserNameUseCase}
 */
class UpdateUserNameUseCase {

    /**
     * Declares an instance of {@link ClientRepository}
     * @date 5/28/2023 - 3:39:02 AM
     *
     * @private
     * @type {ClientRepository}
     */
    private clientRepository: ClientRepository;
    /**
     * Declares an instance of {@link PromoterRepository}
     * @date 5/28/2023 - 3:39:02 AM
     *
     * @private
     * @type {PromoterRepository}
     */
    private promoterRepository: PromoterRepository;
    /**
     * Declares an instance of {@link AdministratorRepository}
     * @date 5/28/2023 - 3:39:02 AM
     *
     * @private
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository;

    /**
     * Constructor for instances of {@link ClientRepository}, {@link PromoterRepository} and {@link AdministratorRepository}
     * @date 5/28/2023 - 3:39:02 AM
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
     * Method that updates and save the new user name in the database
     * @date 5/28/2023 - 3:39:02 AM
     *
     * @public Marks this method as having "public" visibility
     * @async Marks this method as being asynchronous
     * @param {string} tipo Type of the user ("administrator", "client" or "promoter")
     * @param {number} cpf User CPF number
     * @param {string} newName New user name
     * @returns {*}
     */
    public async execute (tipo: string, cpf: number, newName: string){

        //New user name cannot be blank
        if(!newName) {
            throw new ApiError("O novo nome não pode ser vazio!", 422);
        }

        //Checks the type of user in order to communicate with the correct database repository
        if (tipo === "client"){
            
            const cpfClient: any = await this.clientRepository.findByCpf(cpf);

            await this.clientRepository.updateName(cpfClient.cpf, newName);
        } 
        else if (tipo === "promoter"){
            
            const cpfPromoter: any = await this.promoterRepository.findByCpf(cpf);

            await this.promoterRepository.updateName(cpfPromoter.cpf, newName);
        } 
        else if (tipo === "administrator"){
            
            const cpfAdministrator: any = await this.administratorRepository.findByCpf(cpf);

            await this.administratorRepository.updateName(cpfAdministrator.cpf, newName);
        } 
    }

}

export { UpdateUserNameUseCase }; //Class export declarator