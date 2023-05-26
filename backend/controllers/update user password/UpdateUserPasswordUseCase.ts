import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";
import bcrypt from "bcrypt";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/ApiError";

class UpdateUserPasswordUseCase {

    private clientRepository: ClientRepository;
    private promoterRepository: PromoterRepository;
    private administratorRepository: AdministratorRepository;

    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository, administratorRepository: AdministratorRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
        this.administratorRepository = administratorRepository;
    }

    public async execute (tipo: string, cpf: number, passwordAuth: string, newPassword: string, newPasswordConfirmation: string){
        
        if(!newPassword) {
            throw new ApiError("A nova senha não pode ser vazia!", 422);
        }

        if(!newPasswordConfirmation) {
            throw new ApiError("É necessário confirmar sua nova senha!", 422);
        }

        if(newPassword !== newPasswordConfirmation) {
            throw new ApiError("A senha não coincide com sua confirmação!", 422);
        }

        if (tipo === "client"){
            const cpfClient: any = await this.clientRepository.findByCpfAndSenha(cpf);
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfClient.senha);

            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }
            
            await this.clientRepository.updatePassword(cpfClient.cpf, newPassword);
        } 
        else if (tipo === "promoter"){
            const cpfPromoter: any = await this.promoterRepository.findByCpfAndSenha(cpf);
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfPromoter.senha);

            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }
            
            await this.promoterRepository.updatePassword(cpfPromoter.cpf, newPassword);
        } 
        else if (tipo === "administrator"){
            const cpfAdministrator: any = await this.administratorRepository.findByCpfAndSenha(cpf);
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfAdministrator.password);

            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }
            
            await this.administratorRepository.updatePassword(cpfAdministrator.cpf, newPassword);
        } 
    }

}

export { UpdateUserPasswordUseCase };