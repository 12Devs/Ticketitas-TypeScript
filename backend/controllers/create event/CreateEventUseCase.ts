import { EventRepository } from "../../db/EventRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { ApiError } from "../../errors/ApiError";


class CreateEventUseCase {

    private eventRepository: EventRepository;

    public constructor (eventRepository: EventRepository) {
        this.eventRepository = eventRepository;
    }

    public async execute (promoterCpf: number, nome: string, descricao: string, dataEvento: Date, status: boolean, quantPista: number, quantStage: number, quantVip: number, valorPista: number, valorStage: number, valorVip: number, cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number) {

        //Validations
        if (!promoterCpf) {
            throw new ApiError("O cpf do promoter é obrigatório!", 422);
        }

        if (!nome){
            throw new ApiError("O nome do evento é obrigatório!", 422);
        }

        if (!descricao){
            throw new ApiError("A descrição do evento é obrigatória!", 422);
        }

        if (!dataEvento){
            throw new ApiError("A data do evento é obrigatório!", 422);
        }

        if (!status){
            throw new ApiError("O status do evento é obrigatório!", 422);
        }

        if (quantPista === undefined || quantPista === null){
            throw new ApiError("A quantidade de ingressos no setor pista é obrigatória!", 422);
        }

        if (quantStage === undefined || quantStage === null){
            throw new ApiError("A quantidade de ingressos no setor stage é obrigatória!", 422);
        }

        if (quantVip === undefined || quantVip === null){
            throw new ApiError("A quantidade de ingressos no setor vip é obrigatória!", 422);
        }

        if (valorPista === undefined || valorPista === null){
            throw new ApiError("O valor dos ingressos no setor pista é obrigatório!", 422);
        }

        if (valorStage === undefined || valorStage === null){
            throw new ApiError("O valor dos ingressos no setor stage é obrigatório!", 422);
        }

        if (valorVip === undefined || valorVip === null){
            throw new ApiError("O valor dos ingressos no setor vip é obrigatório!", 422);
        }

        await this.eventRepository.create(promoterCpf, nome, descricao, dataEvento, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, cep, cidade, estado, bairro, rua, numero);
        
    }

}

export { CreateEventUseCase };