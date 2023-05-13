import { verify } from "jsonwebtoken";
import { TokenPromoterRepository } from "../../db/TokenPromoterRepository";
import auth from "../../config/auth";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";

class RefreshTokenPromoterUseCase {

    private tokenPromoterRepository: TokenPromoterRepository;

    public constructor (tokenPromoterRepository: TokenPromoterRepository) {
        this.tokenPromoterRepository = tokenPromoterRepository;
    }
    
    public async execute (token: string){

        const decode: any = await verify(token, auth.secretRefreshToken);
        const promoterCpf = decode.sub;

        const promoterToken: any = await this.tokenPromoterRepository.findByCpfAndRefreshToken(promoterCpf, token);

        if (!promoterToken) {
            throw new ApiError("Refresh token does not exists!");
        }

        await this.tokenPromoterRepository.deleteByCpf(promoterToken.promoterCpf);

        const refreshToken = await sign({tipo: "Promoter", nome: decode.nome},
            
            auth.secretRefreshToken,
            
            {subject: `${promoterCpf}`,
                expiresIn: auth.expiresInRefreshToken});
        
        
        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);
        
        await this.tokenPromoterRepository.create(promoterCpf, expiresDate, refreshToken);

        const newToken = sign({tipo: "Promoter", nome: decode.nome},
            
            auth.secretToken,

            {subject: `${promoterCpf}`,
                expiresIn: auth.expiresInToken});
        
        
        
        return {token: newToken, refreshToken};

    }

}

export { RefreshTokenPromoterUseCase };