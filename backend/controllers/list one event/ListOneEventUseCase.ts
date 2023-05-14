import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";


class ListOneEventUseCase {

    private eventRepository: EventRepository;

    constructor (eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    public async execute (id: number){
        const event: any = await this.eventRepository.findOneEvent(id);

        
        if(!event) {
            throw new ApiError("Evento não encontrado", 400);
        }
        return event;
    }

}

export { ListOneEventUseCase };