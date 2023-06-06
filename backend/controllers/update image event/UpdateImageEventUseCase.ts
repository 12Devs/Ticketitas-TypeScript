import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";
import { deleteFileStorage, uploadFileStorage } from "../../utils/UploadStorage";
import { deleteFile } from "../../utils/file";

class UpdateImageEventUseCase {

    private eventRepository: EventRepository;

    public constructor (eventRepository: EventRepository){
        this.eventRepository = eventRepository;
    }

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