import { AdministratorRepository } from "../../db/AdministratorRepository";



/**
 * Create event use case class
 * @date 6/6/2023 - 10:39:10 PM
 *
 * @class RemoveAdministratorUseCase
 * @typedef {RemoveAdministratorUseCase}
 */
class RemoveAdministratorUseCase{
    
    /**
     * Create an instance of {@link RemoveAdministratorUseCase}
     * @date 6/6/2023 - 10:39:18 PM
     *
     * @private
     * @type {AdministratorRepository}
     */
    private administratorRepository: AdministratorRepository;

    
    /**
     * Creates an instance of RemoveAdministratorUseCase.
     * @date 6/6/2023 - 10:39:22 PM
     *
     * @constructor
     * @param {AdministratorRepository} eventRepository
     */
    constructor (eventRepository: AdministratorRepository) {
        this.administratorRepository = eventRepository;
    }

    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:39:26 PM
     *
     * @public
     * @async
     * @param {number} administratorCpf
     * @returns {unknown}
     */
    public async execute (administratorCpf: number){
        await this.administratorRepository.removeAdministrator(administratorCpf);
    }
}
export { RemoveAdministratorUseCase };