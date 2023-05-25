import { ClientRepository } from "../../db/ClientRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ApiError } from "../../errors/ApiError";

class ListOneClientUseCase {

    private clientRepository: ClientRepository;
    private enderecoUserRepository: EnderecoUserRepository;

    constructor (clientRepository: ClientRepository, enderecoUserRepository: EnderecoUserRepository) {
        this.clientRepository = clientRepository;
        this.enderecoUserRepository = enderecoUserRepository;
    }

    public async execute (cpf: number){
        const client: any = await this.clientRepository.findOneClient(cpf);
    
        if(!client) {
            throw new ApiError("Client não encontrado", 400);
        }

        const enderecoClient: any = await this.enderecoUserRepository.findOneEnderecoUser(client.enderecoUserId);

        
        return { client, enderecoClient };
    }

}

export { ListOneClientUseCase };