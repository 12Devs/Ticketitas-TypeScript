import { AdministratorRepository } from "../../db/AdministratorRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ApiError } from "../../errors/ApiError";

class ListOneAdministratorUseCase {

    private administratorRepository: AdministratorRepository;

    constructor (administratorRepository: AdministratorRepository) {
        this.administratorRepository = administratorRepository;
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