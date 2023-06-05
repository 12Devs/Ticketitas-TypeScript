import { verify } from "jsonwebtoken";
import { TokenClientRepository } from "../../db/TokenClientRepository";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";

class RefreshTokenClientUseCase {

    private tokenClientRepository: TokenClientRepository;

    public constructor (tokenClientRepository: TokenClientRepository) {
        this.tokenClientRepository = tokenClientRepository;
    }
    
    public async execute (token: string){

        const decode: any = await verify(token, process.env.JWT_REFRESH_SECRET);
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