import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/ApiError";

class UpdateUserPhoneUseCase {

    private clientRepository: ClientRepository;
    private promoterRepository: PromoterRepository;
    private administratorRepository: AdministratorRepository;

    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository, administratorRepository: AdministratorRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
        this.administratorRepository = administratorRepository;
    }

    public async execute (tipo: string, cpf: number, newPhone: number){

        if (tipo === "client"){
            
            if(!newPhone) {
                throw new ApiError("O novo telefone não pode ser vazio!", 422);
            }
            
            const cpfClient: any = await this.clientRepository.findByCpf(cpf);

            await this.clientRepository.updatePhone(cpfClient.cpf, newPhone);
        } 
        else if (tipo === "promoter"){
            
            if(!newPhone) {
                throw new ApiError("O novo telefone não pode ser vazio!", 422);
            }
            
            const cpfPromoter: any = await this.promoterRepository.findByCpf(cpf);

            await this.promoterRepository.updatePhone(cpfPromoter.cpf, newPhone);
        } 
        else if (tipo === "administrator"){
            
            if(!newPhone) {
                throw new ApiError("O novo telefone não pode ser vazio!", 422);
            }
            
            const cpfAdministrator: any = await this.administratorRepository.findByCpf(cpf);

            await this.administratorRepository.updatePhone(cpfAdministrator.cpf, newPhone);
        } 
    }

}

export { UpdateUserPhoneUseCase };