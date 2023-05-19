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

    public async execute (id: number){
        const event: any = await this.eventRepository.findOneEvent(id);
    
        if(!event) {
            throw new ApiError("Evento não encontrado", 400);
        }

        console.log("AQUI: ",event.id)
        const enderecoEvent: any = await this.enderecoEventRepository.findOneEnderecoEvent(event.id);

        
        return { event, enderecoEvent };
    }

}

export { ListOneEventUseCase };