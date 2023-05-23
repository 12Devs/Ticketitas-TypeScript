import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";


class ListOneEventUseCase {

    private eventRepository: EventRepository;
    private enderecoEventRepository: EnderecoEventRepository;

    constructor (eventRepository: EventRepository, enderecoEventRepository: EnderecoEventRepository) {
        this.eventRepository = eventRepository;
        this.enderecoEventRepository = enderecoEventRepository;
    }

    public async execute (id: string){
        const event: any = await this.eventRepository.findOneEvent(id);
    
        if(!event) {
            throw new ApiError("Evento não encontrado", 400);
        }

        const enderecoEvent: any = await this.enderecoEventRepository.findOneEnderecoEvent(event.enderecoEventId);

        
        return { event, enderecoEvent };
    }

}

export { ListOneEventUseCase };