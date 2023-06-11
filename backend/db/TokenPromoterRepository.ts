import { TokenPromoter } from "../models/TokenPromoter";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 11:07:17 PM
 *
 * @class TokenPromoterRepository
 * @typedef {TokenPromoterRepository}
 */
class TokenPromoterRepository {
    
    /**
     * Creates an instance of {@link TokenPromoterRepository}.
     * @date 6/6/2023 - 11:07:20 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @param {Date} expiresDate
     * @param {string} refreshToken
     * @returns {*}
     */
    public async create (promoterCpf: number, expiresDate: Date, refreshToken: string) {
        TokenPromoter.create({refreshToken, expiresDate, promoterCpf});
    }
    
    /**
     * Find one token by cpf and refresh token
     * @date 6/6/2023 - 11:07:24 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @param {string} refreshToken
     * @returns {unknown}
     */
    public async findByCpfAndRefreshToken(promoterCpf: number, refreshToken: string) {
        const tokenExists = await TokenPromoter.findOne({raw: true,
            where: {
                promoterCpf: promoterCpf,
                refreshToken: refreshToken
            }});
        return tokenExists;
    }
    
    /**
     * Delete one token by cpf
     * @date 6/6/2023 - 11:07:34 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @returns {*}
     */
    public async deleteByCpf (promoterCpf: number) {
        await TokenPromoter.destroy({
            where: {promoterCpf: promoterCpf}
        })
    }

}

export { TokenPromoterRepository };