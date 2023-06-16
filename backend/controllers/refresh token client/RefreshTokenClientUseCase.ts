import { verify } from "jsonwebtoken";
import { TokenClientRepository } from "../../db/TokenClientRepository";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";

/**
 * Refresh token client use case class
 * @date 6/6/2023 - 10:37:33 PM
 *
 * @class RefreshTokenClientUseCase
 * @typedef {RefreshTokenClientUseCase}
 */
class RefreshTokenClientUseCase {
    
    /**
     * Creates an instance of {@link RefreshTokenClientUseCase}.
     * @date 6/6/2023 - 10:37:41 PM
     *
     * @private
     * @type {TokenClientRepository}
     */
    private tokenClientRepository: TokenClientRepository;
    
    /**
     * Creates an instance of RefreshTokenClientUseCase.
     * @date 6/6/2023 - 10:37:46 PM
     *
     * @constructor
     * @public
     * @param {TokenClientRepository} tokenClientRepository
     */
    public constructor (tokenClientRepository: TokenClientRepository) {
        this.tokenClientRepository = tokenClientRepository;
    }
    
    /**
     * Method for refresh token of a client
     * @date 6/6/2023 - 10:37:50 PM
     *
     * @public
     * @async
     * @param {string} token
     * @returns {unknown}
     */
    public async execute (token: string){

        const decode: any = await verify(token, process.env.JWT_SECRET_CLIENT);
        const clientCpf = decode.sub;

        const clientToken: any = await this.tokenClientRepository.findByCpfAndRefreshToken(clientCpf, token);

        if (!clientToken) {
            throw new ApiError("Refresh token does not exists!");
        }

        await this.tokenClientRepository.deleteByCpf(clientToken.clientCpf);

        const refreshToken = await sign({tipo: "client", nome: decode.nome},
            
            process.env.JWT_REFRESH_SECRET,
            
            {subject: `${clientCpf}`,
                expiresIn: process.env.EXPIRES_REFRESH_TOKEN});
        
        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);
        
        await this.tokenClientRepository.create(clientCpf, expiresDate, refreshToken);

        const newToken = sign({tipo: "client", nome: decode.nome},
            
            process.env.JWT_SECRET,

            {subject: `${clientCpf}`,
                expiresIn: process.env.EXPIRES_TOKEN});
        
        return {token: newToken, refreshToken};
    }

}

export { RefreshTokenClientUseCase };