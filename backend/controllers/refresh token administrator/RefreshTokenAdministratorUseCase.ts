import { verify } from "jsonwebtoken";
import { TokenAdministratorRepository } from "../../db/TokenAdministratorRepository";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";

class RefreshTokenAdministratorUseCase {

    private tokenAdministratorRepository: TokenAdministratorRepository;

    public constructor (tokenAdministratorRepository: TokenAdministratorRepository) {
        this.tokenAdministratorRepository = tokenAdministratorRepository;
    }
    
    public async execute (token: string){

        const decode: any = await verify(token, process.env.JWT_REFRESH_SECRET);
        const administratorCpf = decode.sub;

        const administratorToken: any = await this.tokenAdministratorRepository.findByCpfAndRefreshToken(administratorCpf, token);

        if (!administratorToken) {
            throw new ApiError("Refresh token does not exists!");
        }

        await this.tokenAdministratorRepository.deleteByCpf(administratorToken.administratorCpf);

        const refreshToken = await sign({tipo: "Administrator", nome: decode.nome},
            
            process.env.JWT_REFRESH_SECRET,
            
            {subject: `${administratorCpf}`,
                expiresIn: process.env.EXPIRES_REFRESH_TOKEN});

        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);
        
        await this.tokenAdministratorRepository.create(administratorCpf, expiresDate, refreshToken);

        const newToken = sign({tipo: "Administrator", nome: decode.nome},
            
            process.env.JWT_SECRET,

            {subject: `${administratorCpf}`,
                expiresIn: process.env.EXPIRES_TOKEN});
        
        return {token: newToken, refreshToken};
    }

}

export { RefreshTokenAdministratorUseCase };