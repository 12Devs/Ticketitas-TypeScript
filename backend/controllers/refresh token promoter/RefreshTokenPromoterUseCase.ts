import { verify } from "jsonwebtoken";
import { TokenPromoterRepository } from "../../db/TokenPromoterRepository";
import { ApiError } from "../../errors/ApiError";
import { sign } from "jsonwebtoken";
import { PromoterRepository } from "../../db/PromoterRepository";

class RefreshTokenPromoterUseCase {

    private tokenPromoterRepository: TokenPromoterRepository;
    private promoterRepository: PromoterRepository;

    public constructor (tokenPromoterRepository: TokenPromoterRepository, promoterRepository: PromoterRepository) {
        this.tokenPromoterRepository = tokenPromoterRepository;
        this.promoterRepository = promoterRepository;
    }
    
    public async execute (token: string){

        const decode: any = await verify(token, process.env.JWT_REFRESH_SECRET);
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
            
            process.env.JWT_REFRESH_SECRET,
            
            {subject: `${promoterCpf}`,
                expiresIn: process.env.EXPIRES_REFRESH_TOKEN});

        var expiresDate = new Date();
        expiresDate.setDate(expiresDate.getDate() + 30);
        
        await this.tokenPromoterRepository.create(promoterCpf, expiresDate, refreshToken);

        const newToken = sign({tipo: "Promoter", nome: decode.nome},
            
            process.env.JWT_SECRET,

            {subject: `${promoterCpf}`,
                expiresIn: process.env.EXPIRES_TOKEN});
        
        return {token: newToken, refreshToken};
    }

}

export { RefreshTokenPromoterUseCase };