import { EventRepository } from "../../db/EventRepository";


//class
class EditEventUseCase{
    private eventRepository: EventRepository;


    constructor (eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    
    public async execute (promoterCpf: number, id: string, nome: string, descricao: string, dataEvento: Date, quantPista: number, quantStage: number, quantVip: number, valorPista: number, valorStage: number, valorVip: number, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){
        const oneEvent = await this.eventRepository.updateData(promoterCpf, id, nome, descricao, dataEvento, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, estado, cidade, bairro, rua, numero);
        return oneEvent;
    }



}
export { EditEventUseCase };