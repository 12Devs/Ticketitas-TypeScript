import { ClientRepository } from "../../db/ClientRepository";
import { Client } from "../../models/Client";
import { deleteFile } from "../../utils/file";

class UpdateUseAvatarUserCase {

    private userRepository: ClientRepository;

    public constructor (clientRepository: ClientRepository){
        this.userRepository = clientRepository;
    }

    public async execute (cpf: any, avatarImage: string){

        
        if (this.userRepository instanceof ClientRepository){
            const cpfAndAvatarClient: any = await this.userRepository.findByCpfAndAvatar(cpf);
            
            if(cpfAndAvatarClient.avatarImage) {

                await deleteFile(`backend/uploadImages/profiles/${cpfAndAvatarClient.avatarImage}`);
            }

            await this.userRepository.updateAvatar(cpfAndAvatarClient.cpf, avatarImage);
        }
    }

}

export { UpdateUseAvatarUserCase };