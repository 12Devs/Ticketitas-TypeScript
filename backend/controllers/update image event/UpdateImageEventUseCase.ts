import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";
import { deleteFile } from "../../utils/file";

class UpdateImageEventUseCase {

    private eventRepository: EventRepository;

    public constructor (eventRepository: EventRepository){
        this.eventRepository = eventRepository;
    }

    public async execute (id: string, cpf: number, imageEvent: string){
        const idAndImageEvent: any = await this.eventRepository.findByIdAndAvatar(id, cpf);
        
        if(!idAndImageEvent) {
            throw new ApiError("Identificação do Promoter não bate com o evento", 401);
        }

        if(idAndImageEvent.imageEvent) {
            await deleteFile(`backend/uploadImages/events/${idAndImageEvent.imageEvent}`);
        }

        await this.eventRepository.updateImage(idAndImageEvent.id, cpf, imageEvent); 
    }

}

export { UpdateImageEventUseCase };