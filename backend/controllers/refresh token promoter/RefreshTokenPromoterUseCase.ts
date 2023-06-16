import { verify } from "jsonwebtoken";
import { TokenPromoterRepository } from "../../db/TokenPromoterRepository";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";
import { PromoterRepository } from "../../db/PromoterRepository";

/**
 * Refresh token promoter use case class
 * @date 6/6/2023 - 10:38:24 PM
 *
 * @class RefreshTokenPromoterUseCase
 * @typedef {RefreshTokenPromoterUseCase}
 */
class RefreshTokenPromoterUseCase {
    
    /**
     * Creates an instance of {@link RefreshTokenPromoterUseCase}.
     * @date 6/6/2023 - 10:38:28 PM
     *
     * @private
     * @type {TokenPromoterRepository}
     */
    private tokenPromoterRepository: TokenPromoterRepository;
    private promoterRepository: PromoterRepository;
    
    /**
     * Creates an instance of RefreshTokenPromoterUseCase.
     * @date 6/6/2023 - 10:38:33 PM
     *
     * @constructor
     * @public
     * @param {TokenPromoterRepository} tokenPromoterRepository
     * @param {PromoterRepository} promoterRepository
     */
    public constructor (tokenPromoterRepository: TokenPromoterRepository, promoterRepository: PromoterRepository) {
        this.tokenPromoterRepository = tokenPromoterRepository;
        this.promoterRepository = promoterRepository;
    }
    
    /**
     * Method for refresh token of a promoter
     * @date 6/6/2023 - 10:38:36 PM
     *
     * @public
     * @async
     * @param {string} token
     * @returns {unknown}
     */
    public async execute (token: string){

        const decode: any = await verify(token, process.env.JWT_REFRESH_SECRET as string);
        const promoterCpf = decode.sub;

        const promoterToken: any = await this.tokenPromoterRepository.findByCpfAndRefreshToken(promoterCpf, token);

        if (!promoterToken) {
            throw new ApiError("Refresh token does not exists!");
        }

        await this.tokenPromoterRepository.deleteByCpf(promoterToken.promoterCpf);

        const promoterStatus: any = await this.promoterRepository.findStatusByCpf(promoterToken.promoterCpf);

        if (promoterStatus.status == false) {
            throw new ApiError("Promoter suspenso", 401);
        }
        const refreshToken = await sign({tipo: "Promoter", nome: decode.nome},
            
            process.env.JWT_REFRESH_SECRET as string,
            
            {subject: `${promoterCpf}`,
                expiresIn: process.env.EXPIRES_REFRESH_TOKEN});

        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);
        
        await this.tokenPromoterRepository.create(promoterCpf, expiresDate, refreshToken);

        const newToken = sign({tipo: "Promoter", nome: decode.nome},
            
            process.env.JWT_SECRET_PROMOTER as string,

            {subject: `${promoterCpf}`,
                expiresIn: process.env.EXPIRES_TOKEN});
        
        return {token: newToken, refreshToken};
    }

}

export { RefreshTokenPromoterUseCase };