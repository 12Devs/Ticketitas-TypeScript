import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";
import { deleteFileStorage, uploadFileStorage } from "../../utils/UploadStorage";
import { deleteFile } from "../../utils/file";

/**
 * Update image event use case class
 * @date 6/6/2023 - 10:41:09 PM
 *
 * @class UpdateImageEventUseCase
 * @typedef {UpdateImageEventUseCase}
 */
class UpdateImageEventUseCase {
    
    /**
     * Create an instance of {@link UpdateImageEventUseCase}
     * @date 6/6/2023 - 10:41:13 PM
     *
     * @private
     * @type {EventRepository}
     */
    private eventRepository: EventRepository;
    
    /**
     * Creates an instance of UpdateImageEventUseCase.
     * @date 6/6/2023 - 10:41:16 PM
     *
     * @constructor
     * @public
     * @param {EventRepository} eventRepository
     */
    public constructor (eventRepository: EventRepository){
        this.eventRepository = eventRepository;
    }
    
    /**
     * Method for make a update of a image event
     * @date 6/6/2023 - 10:41:20 PM
     *
     * @public
     * @async
     * @param {string} id
     * @param {number} cpf
     * @param {*} imageEvent
     * @returns {*}
     */
    public async execute (id: string, cpf: number, imageEvent: any){

        const imageUpload = await uploadFileStorage(imageEvent);

        const idAndImageEvent: any = await this.eventRepository.findByIdAndAvatar(id, cpf);
        

        if(!idAndImageEvent) {
            throw new ApiError("Identificação do Promoter não bate com o evento", 401);
        }

        if(idAndImageEvent.imageEvent) {
            await deleteFileStorage(idAndImageEvent.imageEvent);
        }

        await deleteFile(`backend/temp/${imageEvent.filename}`);

        await this.eventRepository.updateImage(idAndImageEvent.id, cpf, imageUpload.id); 
    }

}

export { UpdateImageEventUseCase };