import { verify } from "jsonwebtoken";
import { TokenClientRepository } from "../../db/TokenClientRepository";
import auth from "../../config/auth";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";

class RefreshTokenClientUseCase {

    private tokenClientRepository: TokenClientRepository;

    public constructor (tokenClientRepository: TokenClientRepository) {
        this.tokenClientRepository = tokenClientRepository;
    }
    
    public async execute (token: string){

        const decode: any = await verify(token, auth.secretRefreshToken);
        const clientCpf = decode.sub;

        const clientToken: any = await this.tokenClientRepository.findByCpfAndRefreshToken(clientCpf, token);

        if (!clientToken) {
            throw new ApiError("Refresh token does not exists!");
        }

        await this.tokenClientRepository.deleteByCpf(clientToken.clientCpf);

        const refreshToken = await sign({tipo: "client", nome: decode.nome},
            
            auth.secretRefreshToken,
            
            {subject: `${clientCpf}`,
                expiresIn: auth.expiresInRefreshToken});
        
        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);
        
        await this.tokenClientRepository.create(clientCpf, expiresDate, refreshToken);

        const newToken = sign({tipo: "client", nome: decode.nome},
            
            auth.secretToken,

            {subject: `${clientCpf}`,
                expiresIn: auth.expiresInToken});
        
        return {token: newToken, refreshToken};
    }

}

export { RefreshTokenClientUseCase };