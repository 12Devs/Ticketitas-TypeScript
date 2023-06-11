import { Wallet } from "../models/Wallet"


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 11:07:43 PM
 *
 * @class WalletRepository
 * @typedef {WalletRepository}
 */
class WalletRepository {
    
    /**
     * Creates an instance of {@link WalletRepository}.
     * @date 6/6/2023 - 11:07:48 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @param {number} amount
     * @returns {*}
     */
    public async create (cpf: number, amount: number){
        await Wallet.create({cpf, amount});
    }
    
    /**
     * Find one wallet by cpf
     * @date 6/6/2023 - 11:07:52 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @returns {unknown}
     */
    public async findWallet (clientCpf: number) {
        const wallet = await Wallet.findOne({raw: true,
            where: {
                cpf: clientCpf
        }});
        return wallet;
    }
    
    /**
     * Update wallet amount
     * @date 6/6/2023 - 11:07:57 PM
     *
     * @public
     * @async
     * @param {number} clientCpf
     * @param {number} newAmount
     * @returns {*}
     */
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