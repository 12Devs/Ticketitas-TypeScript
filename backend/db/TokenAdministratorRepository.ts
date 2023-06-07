import { TokenAdministrator } from "../models/TokenAdministrator";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 11:06:27 PM
 *
 * @class TokenAdministratorRepository
 * @typedef {TokenAdministratorRepository}
 */
class TokenAdministratorRepository {
    
    /**
     * Creates an instance of {@link TokenAdministratorRepository}.
     * @date 6/6/2023 - 11:06:31 PM
     *
     * @public
     * @async
     * @param {number} administratorCpf
     * @param {Date} expiresDate
     * @param {string} refreshToken
     * @returns {*}
     */
    public async create (administratorCpf: number, expiresDate: Date, refreshToken: string) {
        TokenAdministrator.create({refreshToken, expiresDate, administratorCpf});
    }
    
    /**
     * Find one token by cpf and refresh token
     * @date 6/6/2023 - 11:06:36 PM
     *
     * @public
     * @async
     * @param {number} administratorCpf
     * @param {string} refreshToken
     * @returns {unknown}
     */
    public async findByCpfAndRefreshToken(administratorCpf: number, refreshToken: string) {
        const tokenExists = await TokenAdministrator.findOne({raw: true,
            where: {
                administratorCpf: administratorCpf,
                refreshToken: refreshToken
            }});
        return tokenExists;
    }
    
    /**
     * Delete one token by cpf
     * @date 6/6/2023 - 11:06:42 PM
     *
     * @public
     * @async
     * @param {number} administratorCpf
     * @returns {*}
     */
    public async deleteByCpf (administratorCpf: number) {
        await TokenAdministrator.destroy({
            where: {administratorCpf: administratorCpf}
        })
    }

}

export { TokenAdministratorRepository };