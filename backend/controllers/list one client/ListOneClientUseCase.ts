import { ClientRepository } from "../../db/ClientRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { WalletRepository } from "../../db/WalletRepository";
import { ApiError } from "../../errors/ApiError";

/**
 * List one client use case class
 * @date 6/6/2023 - 10:25:13 PM
 *
 * @class ListOneClientUseCase
 * @typedef {ListOneClientUseCase}
 */
class ListOneClientUseCase {
    
    /**
     * Creates an instance of {@link ListOneClientUseCase}.
     * @date 6/6/2023 - 10:25:25 PM
     *
     * @private
     * @type {ClientRepository}
     */
    private clientRepository: ClientRepository;
    private enderecoUserRepository: EnderecoUserRepository;
    private walletRepository: WalletRepository;
    
    /**
     * Creates an instance of ListOneClientUseCase.
     * @date 6/6/2023 - 10:25:30 PM
     *
     * @constructor
     * @param {ClientRepository} clientRepository
     * @param {EnderecoUserRepository} enderecoUserRepository
     * @param {WalletRepository} walletRepository
     */
    constructor (clientRepository: ClientRepository, enderecoUserRepository: EnderecoUserRepository, walletRepository: WalletRepository) {
        this.clientRepository = clientRepository;
        this.enderecoUserRepository = enderecoUserRepository;
        this.walletRepository = walletRepository;
    }
    
    /**
     * Method for make a creation of a event
     * @date 6/6/2023 - 10:25:34 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async execute (cpf: number){
        const client: any = await this.clientRepository.findOneClient(cpf);
    
        if(!client) {
            throw new ApiError("Client não encontrado", 400);
        }

        const wallet: any = await this.walletRepository.findWallet(cpf);

        if (!wallet) {
            client.saldo = 0.00;
        } else {
            client.saldo = wallet.amount;
        }

        const enderecoClient: any = await this.enderecoUserRepository.findOneEnderecoUser(client.enderecoUserId);
        
        return { client, enderecoClient };
    }

}

export { ListOneClientUseCase };