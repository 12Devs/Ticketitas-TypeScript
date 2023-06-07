import { ClientRepository } from "../../db/ClientRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { uploadFileStorage, deleteFileStorage } from "../../utils/UploadStorage";
import { deleteFile } from "../../utils/file";

/**
 * Update use avatar use case class
 * @date 6/6/2023 - 10:43:20 PM
 *
 * @class UpdateUseAvatarUserCase
 * @typedef {UpdateUseAvatarUserCase}
 */
class UpdateUseAvatarUserCase {
    
    /**
     * Creates an instance of {@link UpdateUseAvatarUserCase}.
     * @date 6/6/2023 - 10:43:24 PM
     *
     * @private
     * @type {ClientRepository}
     */
    private clientRepository: ClientRepository;
    private promoterRepository: PromoterRepository;
    
    /**
     * Creates an instance of UpdateUseAvatarUserCase.
     * @date 6/6/2023 - 10:43:28 PM
     *
     * @constructor
     * @public
     * @param {ClientRepository} clientRepository
     * @param {PromoterRepository} promoterRepository
     */
    public constructor (clientRepository: ClientRepository, promoterRepository: PromoterRepository){
        this.clientRepository = clientRepository;
        this.promoterRepository = promoterRepository;
    }
    
    /**
     * Manipulate method for make a update use avatar
     * @date 6/6/2023 - 10:43:32 PM
     *
     * @public
     * @async
     * @param {string} tipo
     * @param {number} cpf
     * @param {*} avatarImage
     * @returns {*}
     */
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