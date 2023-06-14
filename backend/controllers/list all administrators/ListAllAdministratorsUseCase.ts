import { AdministratorRepository } from "../../db/AdministratorRepository";


/**
 * List events use case class
 * @date 6/6/2023 - 10:20:09 PM
 *
 * @class ListAllAdministratorsUseCase
 * @typedef {ListAllAdministratorsUseCase}
 */
class ListAllAdministratorsUseCase {
    
    /**
     * Creates an instance of {@link ListAllAdministratorsUseCase}.
     * @date 6/6/2023 - 10:20:14 PM
     *
     * @private
     * @type {EventRepository}
     */
    private administratorRepository: AdministratorRepository;
    
    /**
     * Creates an instance of ListAllAdministratorsUseCase.
     * @date 6/6/2023 - 10:20:18 PM
     *
     * @constructor
     * @param {EventRepository} eventRepository
     */
    constructor (administratorRepository: AdministratorRepository) {
        this.administratorRepository = administratorRepository;
    }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:20:22 PM
     *
     * @public
     * @async
     * @returns {unknown}
     */
    public async execute (){
        const allAdministrators = await this.administratorRepository.findAllAdministrators();
        return allAdministrators;
    }

}

export { ListAllAdministratorsUseCase };