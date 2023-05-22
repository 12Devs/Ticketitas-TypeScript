import { CardRepository } from "../../db/CardRepository";
import { EventRepository } from "../../db/EventRepository";
import { SaleRepository } from "../../db/SaleRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { ApiError } from "../../errors/ApiError";
import { EmailProvider } from "../../utils/EmailProvider";
import { resolve } from "path";

class MakePurchaseUseCase {

    private saleRepository: SaleRepository;
    private ticketRepository: TicketRepository;
    private eventRepository: EventRepository;
    private cardRepository: CardRepository;
    private emailProvider: EmailProvider;

    public constructor (saleRepository: SaleRepository, eventRepository: EventRepository, ticketRepository: TicketRepository, cardRepository: CardRepository, emailProvider: EmailProvider) {
        this.saleRepository = saleRepository;
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
        this.cardRepository = cardRepository;
        this.emailProvider = emailProvider;
    }

    public async execute (pistaAmount: number, stageAmount: number, vipAmount: number, clientCpf: number, email: string, eventId: string){

        //Validations
        if(!pistaAmount) {
            throw new ApiError("A quantidade de ingressos pista é obrigatória!", 422);
        }

        if(!stageAmount) {
            throw new ApiError("A quantidade de ingressos stage é obrigatória!", 422);
        }

        if(!vipAmount) {
            throw new ApiError("A quantidade de ingressos vip é obrigatória!", 422);
        }

        if(!clientCpf) {
            throw new ApiError("O cpf do cliente é obrigatório!", 422);
        }

        if(!eventId) {
            throw new ApiError("O id do evento é obrigatório!", 422);
        }

        const card: any = await this.cardRepository.findAllByCpf(clientCpf);

        if (!card) {
            throw new ApiError("Adicione um cartão de crédito antes de prosseguir com a compra!", 422);
        }

        const cardExpiration = new Date(card.expirationDate);
        const dateNow = new Date(Date.now());

        if (cardExpiration < dateNow) {
            throw new ApiError("Cartão de crédito expirado! Não foi possível prosseguir com a compra!", 422);
        }

        const event: any = await this.eventRepository.findOneEvent(eventId);

        const amount = (pistaAmount*event.valorPista) + (stageAmount*event.valorStage) + (vipAmount*event.valorVip);

        await this.saleRepository.create(amount, clientCpf, eventId);

        const idSale: any = await this.saleRepository.findIdByCpf(clientCpf);
        
        for (let i = 0; i < pistaAmount; i++) {
            await this.ticketRepository.create(clientCpf, "pista", "inteira", event.valorPista, event.dataEvento, idSale.id);
        }

        for (let i = 0; i < stageAmount; i++) {
            await this.ticketRepository.create(clientCpf, "stage", "inteira", event.valorStage, event.dataEvento, idSale.id);
        }

        for (let i = 0; i < vipAmount; i++) {
            await this.ticketRepository.create(clientCpf, "vip", "inteira", event.valorVip, event.dataEvento, idSale.id);
        }

        const templatePath = resolve(__dirname, '..', '..', 'utils', 'templates', 'MakePurchaseTemplate.hbs');
        
        const variables = {
            name: card.holder,
            amount: amount,
            eventName: event.nome,
            eventDate: event.dataEvento,
            

        }
        await this.emailProvider.sendEmail(email, `Ingressos: ${event.name}`, variables, templatePath);
        
    }
}

export { MakePurchaseUseCase };