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
            
            const cpfAndAvatarClient = await this.userRepository.findByCpfAndAvatar(cpf.cpf);

            if(cpfAndAvatarClient.avatarImage) {

                await deleteFile(`backend/uploadImages/profiles/${cpfAndAvatarClient.avatarImage}`);
            }

            await Client.update({
                avatarImage: avatarImage
            },
            {
                where: {
                    cpf: cpfAndAvatarClient.cpf
                }
            });
        }
    }

}

export { UpdateUseAvatarUserCase };