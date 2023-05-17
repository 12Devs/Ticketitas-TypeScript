import { TokenAdministrator } from "../models/TokenAdministrator";


class TokenAdministratorRepository {

    public async create (administratorCpf: number, expiresDate: Date, refreshToken: string) {
        TokenAdministrator.create({refreshToken, expiresDate, administratorCpf});
    }

    public async findByCpfAndRefreshToken(administratorCpf: number, refreshToken: string) {
        const tokenExists = await TokenAdministrator.findOne({raw: true,
            where: {
                administratorCpf: administratorCpf,
                refreshToken: refreshToken
            }});
        return tokenExists;
    }

    public async deleteByCpf (administratorCpf: number) {
        await TokenAdministrator.destroy({
            where: {administratorCpf: administratorCpf}
        })
    }

}

export { TokenAdministratorRepository };