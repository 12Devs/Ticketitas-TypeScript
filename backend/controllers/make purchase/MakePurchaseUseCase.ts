import { CardRepository } from "../../db/CardRepository";
import { EventRepository } from "../../db/EventRepository";
import { SaleRepository } from "../../db/SaleRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { ApiError } from "../../errors/ApiError";
import { EmailProvider } from "../../utils/EmailProvider";
import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";

class MakePurchaseUseCase {

    private saleRepository: SaleRepository;
    private ticketRepository: TicketRepository;
    private eventRepository: EventRepository;
    private cardRepository: CardRepository;
    private enderecoEventRepository: EnderecoEventRepository;
    private emailProvider: EmailProvider;

    public constructor (saleRepository: SaleRepository, eventRepository: EventRepository, ticketRepository: TicketRepository, cardRepository: CardRepository, enderecoEventRepository: EnderecoEventRepository, emailProvider: EmailProvider) {
        this.saleRepository = saleRepository;
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
        this.cardRepository = cardRepository;
        this.enderecoEventRepository = enderecoEventRepository;
        this.emailProvider = emailProvider;
    }

    public async execute (pistaAmount: number, stageAmount: number, vipAmount: number, pistaAmountHalf: number, stageAmountHalf: number, vipAmountHalf: number, freeAmount: number, clientName: string, clientCpf: number, email: string, eventId: string){

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

        if(!pistaAmountHalf) {
            throw new ApiError("A quantidade de ingressos meia-entrada pista é obrigatória!", 422);
        }

        if(!stageAmountHalf) {
            throw new ApiError("A quantidade de ingressos meia-entrada stage é obrigatória!", 422);
        }

        if(!vipAmountHalf) {
            throw new ApiError("A quantidade de ingressos meia-entrada vip é obrigatória!", 422);
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

        const amount = (pistaAmount*event.valorPista) + (stageAmount*event.valorStage) + (vipAmount*event.valorVip) + ((pistaAmountHalf*event.valorPista)/2) + ((stageAmountHalf*event.valorStage)/2) + ((vipAmountHalf*event.valorVip)/2);

        await this.saleRepository.create(amount, clientCpf, eventId);

        const idSale: any = await this.saleRepository.findIdByCpf(clientCpf);
        
        for (let i = 0; i < pistaAmount; i++) {
            await this.ticketRepository.create(clientCpf, "Pista", "Inteira", event.valorPista, event.dataEvento, idSale.id);
        }

        for (let i = 0; i < stageAmount; i++) {
            await this.ticketRepository.create(clientCpf, "Stage", "Inteira", event.valorStage, event.dataEvento, idSale.id);
        }

        for (let i = 0; i < vipAmount; i++) {
            await this.ticketRepository.create(clientCpf, "Vip", "Inteira", event.valorVip, event.dataEvento, idSale.id);
        }

        for (let i = 0; i < pistaAmountHalf; i++) {
            await this.ticketRepository.create(clientCpf, "Pista", "Meia-entrada", event.valorPista, event.dataEvento, idSale.id);
        }

        for (let i = 0; i < stageAmountHalf; i++) {
            await this.ticketRepository.create(clientCpf, "Stage", "Meia-entrada", event.valorStage, event.dataEvento, idSale.id);
        }

        for (let i = 0; i < vipAmountHalf; i++) {
            await this.ticketRepository.create(clientCpf, "Vip", "Meia-entrada", event.valorVip, event.dataEvento, idSale.id);
        }

        for (let i = 0; i < freeAmount; i++) {
            await this.ticketRepository.create(clientCpf, "Pista", "Grátis", 0.00, event.dataEvento, idSale.id);
        }

        const enderecoEvent: any = await this.enderecoEventRepository.findOneEnderecoEvent(event.enderecoEventId);
        const eventDate = new Date(event.dataEvento);
        const dateEvent = (eventDate.getUTCDate()) + "/" + (eventDate.getMonth() + 1) + "/" + eventDate.getFullYear();

        const ticketsPistaInfo = {
            nameEvent: event.nome,
            amount: pistaAmount,
            dateEvent,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Pista',
            profile: 'Inteira',
            value: event.valorPista,
            dateSale: dateEvent,
            clientCpf,
            clientName,
        }

        const ticketsStageInfo = {
            nameEvent: event.nome,
            amount: stageAmount,
            dateEvent,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Stage',
            profile: 'Inteira',
            value: event.valorStage,
            dateSale: dateEvent,
            clientCpf,
            clientName,
        }

        const ticketsVipInfo = {
            nameEvent: event.nome,
            amount: vipAmount,
            dateEvent,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Vip',
            profile: 'Inteira',
            value: event.valorVip,
            dateSale: dateEvent,
            clientCpf,
            clientName,
        }

        const ticketsPistaHalfInfo = {
            nameEvent: event.nome,
            amount: pistaAmountHalf,
            dateEvent,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Pista',
            profile: 'Meia-Entrada',
            value: event.valorPista/2,
            dateSale: dateEvent,
            clientCpf,
            clientName,
        }

        const ticketsStageHalfInfo = {
            nameEvent: event.nome,
            amount: stageAmountHalf,
            dateEvent,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Stage',
            profile: 'Meia-Entrada',
            value: event.valorStage/2,
            dateSale: dateEvent,
            clientCpf,
            clientName,
        }

        const ticketsVipHalfInfo = {
            nameEvent: event.nome,
            amount: vipAmountHalf,
            dateEvent,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'vip',
            profile: 'Meia-Entrada',
            value: event.valorVip/2,
            dateSale: dateEvent,
            clientCpf,
            clientName,
        }

        const ticketsFreeInfo = {
            nameEvent: event.nome,
            amount: freeAmount,
            dateEvent,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Pista',
            profile: 'Grátis',
            value: 0.00,
            dateSale: dateEvent,
            clientCpf,
            clientName,
        }

        this.emailProvider.sendEmailTicketAttached(email, ticketsPistaInfo);
        this.emailProvider.sendEmailTicketAttached(email, ticketsStageInfo);
        this.emailProvider.sendEmailTicketAttached(email, ticketsVipInfo);
        this.emailProvider.sendEmailTicketAttached(email, ticketsPistaHalfInfo);
        this.emailProvider.sendEmailTicketAttached(email, ticketsStageHalfInfo);
        this.emailProvider.sendEmailTicketAttached(email, ticketsVipHalfInfo);
        this.emailProvider.sendEmailTicketAttached(email, ticketsFreeInfo); 
    }
}

export { MakePurchaseUseCase };