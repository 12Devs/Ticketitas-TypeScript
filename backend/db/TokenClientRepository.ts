import { TokenClient } from "../models/TokenClient";


class TokenClientRepository {

    public async create (clientCpf: number, expiresDate: Date, refreshToken: string) {
        TokenClient.create({refreshToken, expiresDate, clientCpf});
    }

    public async findByCpfAndRefreshToken(clientCpf: number, refreshToken: string) {
        const tokenExists = await TokenClient.findOne({raw: true,
            where: {
                clientCpf: clientCpf,
                refreshToken: refreshToken
            }});
        return tokenExists;
    }

    public async deleteByCpf (clientCpf: number) {
        await TokenClient.destroy({
            where: {clientCpf: clientCpf}
        })
    }

}

export { TokenClientRepository };