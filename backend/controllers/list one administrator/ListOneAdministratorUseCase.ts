import { AdministratorRepository } from "../../db/AdministratorRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ApiError } from "../../errors/ApiError";


/**
 * List one administrator use case class
 * @date 6/6/2023 - 10:22:17 PM
 *
 * @class ListOneAdministratorUseCase
 * @typedef {ListOneAdministratorUseCase}
 */
class ListOneAdministratorUseCase {
    
    /**
     * Creates an instance of {@link ListOneAdministratorUseCase}.
     * @date 6/6/2023 - 10:22:30 PM
     *
     * @private
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository;
    
    /**
     * Creates an instance of ListOneAdministratorUseCase.
     * @date 6/6/2023 - 10:22:36 PM
     *
     * @constructor
     * @param {AdministratorRepository} administratorRepository
     */
    constructor (administratorRepository: AdministratorRepository) {
        this.administratorRepository = administratorRepository;
    }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:22:44 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async execute (cpf: number){
        const administrator: any = await this.administratorRepository.findOneAdministrator(cpf);
    
        if(!administrator) {
            throw new ApiError("Administrator não encontrado", 400);
        }

        return { administrator };
    }

}

export { ListOneAdministratorUseCase };