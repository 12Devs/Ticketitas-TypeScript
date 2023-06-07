import { TokenClient } from "../models/TokenClient";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 11:06:54 PM
 *
 * @class TokenClientRepository
 * @typedef {TokenClientRepository}
 */
class TokenClientRepository {
    
    /**
     * Creates an instance of {@link TokenClientRepository}.
     * @date 6/6/2023 - 11:06:59 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @param {Date} expiresDate
     * @param {string} refreshToken
     * @returns {*}
     */
    public async create (clientCpf: number, expiresDate: Date, refreshToken: string) {
        TokenClient.create({refreshToken, expiresDate, clientCpf});
    }
    
    /**
     * Find one token by cpf and refresh token
     * @date 6/6/2023 - 11:07:03 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @param {string} refreshToken
     * @returns {unknown}
     */
    public async findByCpfAndRefreshToken(clientCpf: number, refreshToken: string) {
        const tokenExists = await TokenClient.findOne({raw: true,
            where: {
                clientCpf: clientCpf,
                refreshToken: refreshToken
            }});
        return tokenExists;
    }
    
    /**
     * Delete one token by cpf
     * @date 6/6/2023 - 11:07:09 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @returns {*}
     */
    public async deleteByCpf (clientCpf: number) {
        await TokenClient.destroy({
            where: {clientCpf: clientCpf}
        })
    }

}

export { TokenClientRepository };