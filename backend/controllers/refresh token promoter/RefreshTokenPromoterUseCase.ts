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
        const PromoterCpf = decode.sub;

        const PromoterToken: any = await this.tokenPromoterRepository.findByCpfAndRefreshToken(PromoterCpf, token);

        if (!PromoterToken) {
            throw new ApiError("Refresh token does not exists!");
        }

        await this.tokenPromoterRepository.deleteByCpf(PromoterToken.PromoterCpf);

        const refreshToken = await sign({tipo: "Promoter", nome: decode.nome},
            
            auth.secretRefreshToken,
            
            {subject: `${PromoterCpf}`,
                expiresIn: auth.expiresInRefreshToken});
        
        
        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);
        
        await this.tokenPromoterRepository.create(PromoterCpf, expiresDate, refreshToken);

        const newToken = sign({tipo: "Promoter", nome: decode.nome},
            
            auth.secretToken,

            {subject: `${PromoterCpf}`,
                expiresIn: auth.expiresInToken});
        
        
        
        return {token: newToken, refreshToken};

    }

}

export { RefreshTokenPromoterUseCase };