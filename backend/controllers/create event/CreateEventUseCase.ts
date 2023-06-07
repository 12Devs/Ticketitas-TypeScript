import { EventRepository } from "../../db/EventRepository";
import { PromoterRepository } from "../../db/PromoterRepository";
import { StockRepository } from "../../db/StockRepository";
import { ApiError } from "../../errors/ApiError";


class CreateEventUseCase {

    private eventRepository: EventRepository;
    private stockRepository: StockRepository;
    private promoterRepository: PromoterRepository;

    public constructor (eventRepository: EventRepository, stockRepository: StockRepository, promoterRepository: PromoterRepository) {
        this.eventRepository = eventRepository;
        this.stockRepository = stockRepository;
        this.promoterRepository = promoterRepository;
    }

    public async execute (promoterCpf: number, nome: string, descricao: string, dataEvento: Date, status: boolean, quantPista: number, quantStage: number, quantVip: number, valorPista: number, valorStage: number, valorVip: number, porcentagemMeia: number, porcentagemGratis: number, cep: number, cidade: string, estado: string, bairro: string, rua: string, numero: number) {

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

        if (porcentagemMeia === undefined || porcentagemMeia === null) {
            throw new ApiError("A porcentagem de ingressos meia-entrada é obrigatória!", 422);
        }

        if (porcentagemMeia < 40) {
            throw new ApiError("A quantidaade de ingressos meia-entrada disponivéis deve ser mais de 40% do total de ingressos!", 422);
        }

        if (porcentagemGratis === undefined || porcentagemGratis === null){
            throw new ApiError("A porcentagem de ingressos gratuitos é obrigatória!", 422);
        }

        const promoterExists = await this.promoterRepository.findOnePromoter(promoterCpf);

        if (!promoterExists) {
            throw new ApiError("Não existe promoter associado a esse cpf", 422);
        }

        const event: any = await this.eventRepository.create(promoterCpf, nome, descricao, dataEvento, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip,  porcentagemMeia, porcentagemGratis, cep, cidade, estado, bairro, rua, numero);

        await this.stockRepository.create(event.id, event.quantPista, event.quantStage, event.quantVip);
        
    }

}

export { CreateEventUseCase };