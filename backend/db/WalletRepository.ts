import { Wallet } from "../models/Wallet"


class WalletRepository {

    public async create (cpf: number, amount: number){
        await Wallet.create({cpf, amount});
    }

    public async findWallet (clientCpf: number) {
        const wallet = await Wallet.findOne({raw: true,
            where: {
                cpf: clientCpf
        }});
        return wallet;
    }

    public async updateWallet (clientCpf: number, newAmount: number) {
        await Wallet.update({
            amount: newAmount
        },
        {
            where: {
                cpf: clientCpf
            }
        });
    }
}

export { WalletRepository }