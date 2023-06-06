import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { uploadFileStorage, deleteFileStorage } from "../../utils/UploadStorage";
import { deleteFile } from "../../utils/file";

class UpdateUseAvatarUserCase {

    private clientRepository: ClientRepository;
    private promoterRepository: PromoterRepository;

    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
    }

    public async execute (tipo: string, cpf: number, avatarImage: any){

        if (tipo === "client"){

            const imageUpload = await uploadFileStorage(avatarImage);

            const cpfAndAvatarClient: any = await this.clientRepository.findByCpfAndAvatar(cpf);
            
            if (cpfAndAvatarClient.avatarImage) {
                await deleteFileStorage(cpfAndAvatarClient.avatarImage);
            }
            await deleteFile(`backend/temp/${avatarImage.filename}`);
            await this.clientRepository.updateAvatar(cpfAndAvatarClient.cpf, imageUpload.id);
            
        }
        
        if (tipo === "promoter") {

            const imageUpload = await uploadFileStorage(avatarImage);

            const cpfAndAvatarPromoter: any = await this.promoterRepository.findByCpfAndAvatar(cpf);
            
            if (cpfAndAvatarPromoter.avatarImage) {
                await deleteFileStorage(cpfAndAvatarPromoter.avatarImage);
            }
            await deleteFile(`backend/temp/${avatarImage.filename}`);
            await this.promoterRepository.updateAvatar(cpfAndAvatarPromoter.cpf, imageUpload.id);
        }
    }

}

export { UpdateUseAvatarUserCase };