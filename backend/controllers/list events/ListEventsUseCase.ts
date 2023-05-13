import { EventRepository } from "../../db/EventRepository";


class ListEventsUseCase {

    private eventRepository: EventRepository;

    constructor (eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    public async execute (){
        const allEvents = await this.eventRepository.findAllEvents();
        return allEvents;
    }

}

export { ListEventsUseCase };