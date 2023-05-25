import { AdministratorRepository } from "../../db/AdministratorRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ApiError } from "../../errors/ApiError";

class ListOneAdministratorUseCase {

    private administratorRepository: AdministratorRepository;
    private enderecoUserRepository: EnderecoUserRepository;

    constructor (administratorRepository: AdministratorRepository, enderecoUserRepository: EnderecoUserRepository) {
        this.administratorRepository = administratorRepository;
        this.enderecoUserRepository = enderecoUserRepository;
    }

    public async execute (cpf: number){
        const administrator: any = await this.administratorRepository.findOneAdministrator(cpf);
    
        if(!administrator) {
            throw new ApiError("Administrator não encontrado", 400);
        }

        return { administrator };
    }

}

export { ListOneAdministratorUseCase };