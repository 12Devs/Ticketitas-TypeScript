import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { AdministratorRepository } from "../../db/AdministratorRepository";
import bcrypt from "bcrypt";
/**
 * Import of the class {@link ApiError}
 */
import { ApiError } from "../../errors/ApiError";

class UpdateUserEmailUseCase {

    private clientRepository: ClientRepository;
    private promoterRepository: PromoterRepository;
    private administratorRepository: AdministratorRepository;

    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository, administratorRepository: AdministratorRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
        this.administratorRepository = administratorRepository;
    }

    public async execute (tipo: string, cpf: number, passwordAuth: string, newEmail: string, newEmailConfirmation: string){

        if(!newEmail) {
            throw new ApiError("O novo endereço de email não pode ser vazio!", 422);
        }

        if(!newEmailConfirmation) {
            throw new ApiError("É necessário confirmar seu novo endereço de email!", 422);
        }

        if(newEmail !== newEmailConfirmation) {
            throw new ApiError("O endereço de email não coincide com sua confirmação!", 422);
        }

        if (tipo === "client"){
            const emailClient: any = await this.clientRepository.findByEmail(newEmail);

            if(emailClient !== null && emailClient !== undefined) {
                throw new ApiError("Utilize outro email", 422);
            }

            const cpfClient: any = await this.clientRepository.findByCpfAndSenha(cpf);
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfClient.senha);

            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }
            
            await this.clientRepository.updateEmail(cpfClient.cpf, newEmail);
        } 
        else if (tipo === "promoter"){
            const emailPromoter: any = await this.promoterRepository.findByEmail(newEmail);

            if(emailPromoter !== null && emailPromoter !== undefined) {
                throw new ApiError("Utilize outro email", 422);
            }

            const cpfPromoter: any = await this.promoterRepository.findByCpfAndSenha(cpf);
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfPromoter.senha);

            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }
            
            await this.promoterRepository.updateEmail(cpfPromoter.cpf, newEmail);
        } 
        else if (tipo === "administrator"){
            const emailAdministrator: any = await this.administratorRepository.findByEmailAndSenha(newEmail);

            if(emailAdministrator !== null && emailAdministrator !== undefined) {
                throw new ApiError("Utilize outro email", 422);
            }

            const cpfAdministrator: any = await this.administratorRepository.findByCpfAndSenha(cpf);
            const passwordCheck = bcrypt.compareSync(passwordAuth, cpfAdministrator.password);

            if (!passwordCheck) {
                throw new ApiError("Senha incorreta. Caso tenha esquecido sua senha, solicite uma mudança de senha provendo seu email.", 422);
            }
            
            await this.administratorRepository.updateEmail(cpfAdministrator.cpf, newEmail);
        } 
    }

}

export { UpdateUserEmailUseCase };