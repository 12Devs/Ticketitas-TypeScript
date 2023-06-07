import { ClientRepository } from "../../db/ClientRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { WalletRepository } from "../../db/WalletRepository";
import { ApiError } from "../../errors/ApiError";

class ListOneClientUseCase {

    private clientRepository: ClientRepository;
    private enderecoUserRepository: EnderecoUserRepository;
    private walletRepository: WalletRepository;

    constructor (clientRepository: ClientRepository, enderecoUserRepository: EnderecoUserRepository, walletRepository: WalletRepository) {
        this.clientRepository = clientRepository;
        this.enderecoUserRepository = enderecoUserRepository;
        this.walletRepository = walletRepository;
    }

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