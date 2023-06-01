import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/ApiError";

class UpdateUserCpfUseCase {

    private clientRepository: ClientRepository;
    private promoterRepository: PromoterRepository;
    private administratorRepository: AdministratorRepository;

    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository, administratorRepository: AdministratorRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
        this.administratorRepository = administratorRepository;
    }

    public async execute (tipo: string, cpf: number, newCpf: number){

        if (tipo === "client"){
            
            if(!newCpf) {
                throw new ApiError("O novo número de CPF não pode ser vazio!", 422);
            }
            
            const oldCpfClient: any = await this.clientRepository.findByCpf(cpf);
            const newCpfClient: any = await this.clientRepository.findByCpf(newCpf);

            if(newCpfClient !== null && newCpfClient !== undefined) {
                throw new ApiError("Utilize outro cpf", 422);
            }

            await this.clientRepository.updateCpf(oldCpfClient.cpf, newCpf);

        } 
        else if (tipo === "promoter") {

            if(!newCpf) {
                throw new ApiError("O novo número de CPF não pode ser vazio!", 422);
            }

            const oldCpfPromoter: any = await this.promoterRepository.findByCpf(cpf);
            const newCpfPromoter: any = await this.promoterRepository.findByCpf(newCpf);

            if(newCpfPromoter !== null && newCpfPromoter !== undefined) {
                throw new ApiError("Utilize outro cpf", 422);
            }

            await this.promoterRepository.updateCpf(oldCpfPromoter.cpf, newCpf);
        }
        else if (tipo === "administrator") {

            if(!newCpf) {
                throw new ApiError("O novo número de CPF não pode ser vazio!", 422);
            }

            const oldCpfAdministrator: any = await this.administratorRepository.findByCpf(cpf);
            const newCpfAdministrator: any = await this.administratorRepository.findByCpf(newCpf);

            if(newCpfAdministrator !== null && newCpfAdministrator !== undefined) {
                throw new ApiError("Utilize outro cpf", 422);
            }

            await this.administratorRepository.updateCpf(oldCpfAdministrator.cpf, newCpf);
        }
    }

}

export { UpdateUserCpfUseCase };