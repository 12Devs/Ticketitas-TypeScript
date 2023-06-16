import { verify } from "jsonwebtoken";
import { TokenAdministratorRepository } from "../../db/TokenAdministratorRepository";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";

/**
 * Refresh token administrator use case class
 * @date 6/6/2023 - 10:36:51 PM
 *
 * @class RefreshTokenAdministratorUseCase
 * @typedef {RefreshTokenAdministratorUseCase}
 */
class RefreshTokenAdministratorUseCase {
    
    /**
     * Creates an instance of {@link RefreshTokenAdministratorUseCase}.
     * @date 6/6/2023 - 10:36:57 PM
     *
     * @private
     * @type {TokenAdministratorRepository}
     */
    private tokenAdministratorRepository: TokenAdministratorRepository;
    
    /**
     * Creates an instance of RefreshTokenAdministratorUseCase.
     * @date 6/6/2023 - 10:37:01 PM
     *
     * @constructor
     * @public
     * @param {TokenAdministratorRepository} tokenAdministratorRepository
     */
    public constructor (tokenAdministratorRepository: TokenAdministratorRepository) {
        this.tokenAdministratorRepository = tokenAdministratorRepository;
    }
    
    /**
     * Method for refresh token of a administrator
     * @date 6/6/2023 - 10:37:04 PM
     *
     * @public
     * @async
     * @param {string} token
     * @returns {unknown}
     */
    public async execute (token: string){

        const decode: any = await verify(token, process.env.JWT_REFRESH_SECRET as string);
        
        const administratorCpf = decode.sub;

        const administratorToken: any = await this.tokenAdministratorRepository.findByCpfAndRefreshToken(administratorCpf, token);

        if (!administratorToken) {
            throw new ApiError("Refresh token does not exists!");
        }

        await this.tokenAdministratorRepository.deleteByCpf(administratorToken.administratorCpf);

        var refreshToken
        if (decode.tipo == "administrator") {
            
            refreshToken = await sign({tipo: "administrator", nome: decode.nome},
            
            process.env.JWT_REFRESH_SECRET as string,
            
            {subject: `${administratorCpf}`,
                expiresIn: process.env.EXPIRES_REFRESH_TOKEN as string});
            
            var expiresDate = new Date();
            expiresDate.setDate(expiresDate.getDate() + 30);
            
            await this.tokenAdministratorRepository.create(administratorCpf, expiresDate, refreshToken);
    
            const newToken = sign({tipo: "administrator", nome: decode.nome},
                
                process.env.JWT_SECRET_ADMINISTRATOR as string,
    
                {subject: `${administratorCpf}`,
                    expiresIn: process.env.EXPIRES_TOKEN as string});
            
            return {token: newToken, refreshToken};
        } else {
            refreshToken = await sign({tipo: "superAdministrator", nome: decode.nome},
            
            process.env.JWT_REFRESH_SECRET as string,
            
            {subject: `${administratorCpf}`,
                expiresIn: process.env.EXPIRES_REFRESH_TOKEN as string});
            
            var expiresDate = new Date();
            expiresDate.setDate(expiresDate.getDate() + 30);
            
            await this.tokenAdministratorRepository.create(administratorCpf, expiresDate, refreshToken);
    
            const newToken = sign({tipo: "superAdministrator", nome: decode.nome},
                
                process.env.JWT_SECRET_ADMINISTRATOR as string,
    
                {subject: `${administratorCpf}`,
                    expiresIn: process.env.EXPIRES_TOKEN as string});
            
            return {token: newToken, refreshToken};
        }
    }

}

export { RefreshTokenAdministratorUseCase };