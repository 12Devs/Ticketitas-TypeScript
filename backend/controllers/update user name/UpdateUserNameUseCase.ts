import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/ApiError";

class UpdateUserNameUseCase {

    private clientRepository: ClientRepository;
    private promoterRepository: PromoterRepository;
    private administratorRepository: AdministratorRepository;

    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository, administratorRepository: AdministratorRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
        this.administratorRepository = administratorRepository;
    }

    public async execute (tipo: string, cpf: number, newName: string){

        if (tipo === "client"){
            
            if(!newName) {
                throw new ApiError("O novo nome não pode ser vazio!", 422);
            }
            
            const cpfClient: any = await this.clientRepository.findByCpf(cpf);

            await this.clientRepository.updateName(cpfClient.cpf, newName);
        } 
        else if (tipo === "promoter"){
            
            if(!newName) {
                throw new ApiError("O novo nome não pode ser vazio!", 422);
            }
            
            const cpfPromoter: any = await this.promoterRepository.findByCpf(cpf);

            await this.promoterRepository.updateName(cpfPromoter.cpf, newName);
        } 
        else if (tipo === "administrator"){
            
            if(!newName) {
                throw new ApiError("O novo nome não pode ser vazio!", 422);
            }
            
            const cpfAdministrator: any = await this.administratorRepository.findByCpf(cpf);

            await this.administratorRepository.updateName(cpfAdministrator.cpf, newName);
        } 
    }

}

export { UpdateUserNameUseCase };