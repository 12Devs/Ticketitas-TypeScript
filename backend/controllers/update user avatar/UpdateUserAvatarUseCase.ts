import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { deleteFile } from "../../utils/file";

class UpdateUseAvatarUserCase {

    private clientRepository: ClientRepository;
    private promoterRepository: PromoterRepository;

    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
    }

    public async execute (tipo: string, cpf: number, avatarImage: string){

        if (tipo === "client"){
            const cpfAndAvatarClient: any = await this.clientRepository.findByCpfAndAvatar(cpf);
            
            if(cpfAndAvatarClient.avatarImage) {

                await deleteFile(`backend/uploadImages/profiles/${cpfAndAvatarClient.avatarImage}`);
            }

            await this.clientRepository.updateAvatar(cpfAndAvatarClient.cpf, avatarImage);

        } if (tipo === "promoter") {

            const cpfAndAvatarPromoter: any = await this.promoterRepository.findByCpfAndAvatar(cpf);
            
            
            
            if(cpfAndAvatarPromoter.avatarImage) {

                await deleteFile(`backend/uploadImages/profiles/${cpfAndAvatarPromoter.avatarImage}`);
            }

            await this.promoterRepository.updateAvatar(cpfAndAvatarPromoter.cpf, avatarImage);
        }
    }

}

export { UpdateUseAvatarUserCase };