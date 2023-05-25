import { EventRepository } from "../../db/EventRepository";


//class
class EditEventUseCase{
    private eventRepository: EventRepository;


    constructor (eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    
    public async execute (id: string){
        const oneEvent = await this.eventRepository.findOneEvent(id);
        return oneEvent;
    }



}
export { EditEventUseCase };