import { Wallet } from "../models/Wallet"


class WalletRepository {

    public async create (cpf: number, amout: number){
        await Wallet.create({cpf, amout});
    }

    public async findWallet (clientCpf: number) {
        const wallet = await Wallet.findOne({raw: true,
            where: {
                cpf: clientCpf
        }});
        return wallet;
    }

    public async updateWallet (clientCpf: number, newAmout: number) {
        await Wallet.update({
            amout: newAmout
        },
        {
            where: {
                cpf: clientCpf
            }
        });
    }
}

export { WalletRepository }