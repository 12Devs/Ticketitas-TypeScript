import { verify } from "jsonwebtoken";
import { TokenAdministratorRepository } from "../../db/TokenAdministratorRepository";
import auth from "../../config/auth";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";

class RefreshTokenAdministratorUseCase {

    private tokenAdministratorRepository: TokenAdministratorRepository;

    public constructor (tokenAdministratorRepository: TokenAdministratorRepository) {
        this.tokenAdministratorRepository = tokenAdministratorRepository;
    }
    
    public async execute (token: string){

        const decode: any = await verify(token, auth.secretRefreshToken);
        const administratorCpf = decode.sub;

        const administratorToken: any = await this.tokenAdministratorRepository.findByCpfAndRefreshToken(administratorCpf, token);

        if (!administratorToken) {
            throw new ApiError("Refresh token does not exists!");
        }

        await this.tokenAdministratorRepository.deleteByCpf(administratorToken.administratorCpf);

        const refreshToken = await sign({tipo: "Administrator", nome: decode.nome},
            
            auth.secretRefreshToken,
            
            {subject: `${administratorCpf}`,
                expiresIn: auth.expiresInRefreshToken});

        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);
        
        await this.tokenAdministratorRepository.create(administratorCpf, expiresDate, refreshToken);

        const newToken = sign({tipo: "Administrator", nome: decode.nome},
            
            auth.secretToken,

            {subject: `${administratorCpf}`,
                expiresIn: auth.expiresInToken});
        
        return {token: newToken, refreshToken};
    }

}

export { RefreshTokenAdministratorUseCase };