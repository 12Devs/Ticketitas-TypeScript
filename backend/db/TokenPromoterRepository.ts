import { TokenPromoter } from "../models/TokenPromoter";


class TokenPromoterRepository {

    public async create (promoterCpf: number, expiresDate: Date, refreshToken: string) {
        TokenPromoter.create({refreshToken, expiresDate, promoterCpf});
    }

    public async findByCpfAndRefreshToken(promoterCpf: number, refreshToken: string) {
        const tokenExists = await TokenPromoter.findOne({raw: true,
            where: {
                promoterCpf: promoterCpf,
                refreshToken: refreshToken
            }});
        return tokenExists;
    }

    public async deleteByCpf (promoterCpf: number) {
        await TokenPromoter.destroy({
            where: {promoterCpf: promoterCpf}
        })
    }

}

export { TokenPromoterRepository };