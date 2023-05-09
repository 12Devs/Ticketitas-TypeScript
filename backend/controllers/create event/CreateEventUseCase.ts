import { EventRepository } from "../../db/EventRepository";
import { ApiError } from "../../errors/ApiError";



class CreateEventUseCase {

    private eventRepository: EventRepository;

    public constructor (eventRepository: EventRepository) {

        this.eventRepository = eventRepository;
    }

    public async execute (nome: string, descricao: string, status: boolean, quantPista: number, quantStage: number, quantVip: number, valorPista: number, valorStage: number, valorVip: number, cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number) {

        //Validations

        if (!nome){
            throw new ApiError("O nome do evento é obrigatório!", 422);
        }

        if (!descricao){
            throw new ApiError("A descrição do evento é obrigatória!", 422);
        }

        if (!status){
            throw new ApiError("O status do evento é obrigatório!", 422);
        }

        if (!quantPista){
            throw new ApiError("A quantidade de ingressos no setor pista é obrigatória!", 422);
        }

        if (!quantStage){
            throw new ApiError("A quantidade de ingressos no setor stage é obrigatória!", 422);
        }

        if (!quantVip){
            throw new ApiError("A quantidade de ingressos no setor vip é obrigatória!", 422);
        }

        if (!valorPista){
            throw new ApiError("O valor dos ingressos no setor pista é obrigatório!", 422);
        }

        if (!valorStage){
            throw new ApiError("O valor dos ingressos no setor stage é obrigatório!", 422);
        }

        if (!valorVip){
            throw new ApiError("O valor dos ingressos no setor vip é obrigatório!", 422);
        }

        await this.eventRepository.create(nome, descricao, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, cidade, estado, bairro, rua, numero);
        
    }

}

export { CreateEventUseCase };