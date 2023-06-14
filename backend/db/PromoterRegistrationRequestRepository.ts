import { PromoterRegistrationRequest } from "../models/PromoterRegistrationRequest";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 11:00:08 PM
 *
 * @class PromoterRegistrationRequestRepository
 * @typedef {PromoterRegistrationRequestRepository}
 */
class PromoterRegistrationRequestRepository {
    
    /**
     * Creates an instance of {@link PromoterRegistrationRequestRepository}.
     * @date 6/6/2023 - 11:00:12 PM
     *
     * @public
     * @async
     * @param {string} name
     * @param {string} email
     * @param {number} promoterCpf
     * @returns {*}
     */
    public async create (name: string, email: string, promoterCpf: number) {
        await PromoterRegistrationRequest.create({name, email, promoterCpf});
    }
    
    /**
     * Find one registration request by cpf
     * @date 6/6/2023 - 11:00:16 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @returns {unknown}
     */
    public async findByCpf (promoterCpf: number) {
        const registrationRequest = await PromoterRegistrationRequest.findOne({raw: true,
            where: {
                promoterCpf: promoterCpf
        }});

        return registrationRequest;
    }

    /**
     * Find all events raw
     * @date 6/6/2023 - 10:58:40 PM
     *
     * @public
     * @async
     * @returns {unknown}
    */
    public async findAllPromoterRegistration () {
        const allPromoterRegistration = await PromoterRegistrationRequest.findAll({raw: true});
        return allPromoterRegistration;
    }
    
    /**
     * Check if registration request exists
     * @date 6/6/2023 - 11:00:30 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @returns {unknown}
    */
    public async registrationRequestExists (promoterCpf: number) {
        const registrationRequestExists = await PromoterRegistrationRequest.findOne({raw: true, attributes: ['id'],
            where: {
                promoterCpf: promoterCpf
        }});

        return registrationRequestExists;
    }

    
    /**
     * Remove registration request
     * @date 6/6/2023 - 11:00:46 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @returns {*}
     */
    public async remove (promoterCpf: number) {
        await PromoterRegistrationRequest.destroy({
            where: {promoterCpf: promoterCpf}
        });
    }
}

export { PromoterRegistrationRequestRepository };