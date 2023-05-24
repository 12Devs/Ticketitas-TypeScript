import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { EventRepository } from "../../db/EventRepository";


class ListHighlightsUseCase {

    private eventRepository: EventRepository;
    private enderecoEventRepository: EnderecoEventRepository;

    constructor (eventRepository: EventRepository, enderecoEventRepository: EnderecoEventRepository) {
        this.eventRepository = eventRepository;
        this.enderecoEventRepository = enderecoEventRepository;
    }

    public async execute (){
        
        const allHighlights: any = await this.eventRepository.findAllHighlights();

        for(let highlight of allHighlights) {
            const enderecoHighlight = await this.enderecoEventRepository.findOneEnderecoEvent(highlight.enderecoEventId);
            highlight.enderecoEvent = enderecoHighlight;
        }
        return allHighlights;
    }

}

export { ListHighlightsUseCase };