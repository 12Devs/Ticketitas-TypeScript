import { CardRepository } from "../../db/CardRepository";
import { EventRepository } from "../../db/EventRepository";
import { SaleRepository } from "../../db/SaleRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { ApiError } from "../../errors/ApiError";
import { EmailProvider } from "../../utils/EmailProvider";
import { EnderecoEventRepository } from "../../db/EnderecoEventRepository";
import { generateQrCode } from "../../utils/GenerateQrCode";
import { deleteFile } from "../../utils/file";
import { StockRepository } from "../../db/StockRepository";
import { CheckoutRepository } from "../../db/CheckoutRepository";
import { WalletRepository } from "../../db/WalletRepository";

class MakePurchaseUseCase {

    private stockRepository: StockRepository;
    private saleRepository: SaleRepository;
    private checkoutRepository: CheckoutRepository;
    private ticketRepository: TicketRepository;
    private eventRepository: EventRepository;
    private cardRepository: CardRepository;
    private enderecoEventRepository: EnderecoEventRepository;
    private walletRepository: WalletRepository;
    private emailProvider: EmailProvider;
    

    public constructor (stockRepository: StockRepository, saleRepository: SaleRepository, checkoutRepository: CheckoutRepository, eventRepository: EventRepository, ticketRepository: TicketRepository, cardRepository: CardRepository, enderecoEventRepository: EnderecoEventRepository, walletRepository: WalletRepository, emailProvider: EmailProvider) {
        this.stockRepository = stockRepository;
        this.saleRepository = saleRepository;
        this.checkoutRepository = checkoutRepository;
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
        this.cardRepository = cardRepository;
        this.enderecoEventRepository = enderecoEventRepository;
        this.walletRepository = walletRepository;
        this.emailProvider = emailProvider;
    }

    public async execute (pistaAmount: number, stageAmount: number, vipAmount: number, pistaAmountHalf: number, stageAmountHalf: number, vipAmountHalf: number, freeAmount: number, walletValue: number, clientName: string, clientCpf: number, email: string, eventId: string, checkoutId: string){

        //Validations
        if(!pistaAmount && pistaAmount !== 0) {
            throw new ApiError("A quantidade de ingressos pista é obrigatória!", 422);
        }

        if(!stageAmount && stageAmount !== 0) {
            throw new ApiError("A quantidade de ingressos stage é obrigatória!", 422);
        }

        if(!vipAmount && vipAmount !== 0) {
            throw new ApiError("A quantidade de ingressos vip é obrigatória!", 422);
        }

        if(!pistaAmountHalf && pistaAmountHalf !== 0) {
            throw new ApiError("A quantidade de ingressos meia-entrada pista é obrigatória!", 422);
        }

        if(!stageAmountHalf && stageAmountHalf !== 0) {
            throw new ApiError("A quantidade de ingressos meia-entrada stage é obrigatória!", 422);
        }
        
        if(!vipAmountHalf && vipAmountHalf !== 0) {
            throw new ApiError("A quantidade de ingressos meia-entrada vip é obrigatória!", 422);
        }

        if(!freeAmount && freeAmount !== 0) {
            throw new ApiError("A quantidade de ingressos grátis é obrigatória!", 422);
        }

        if(!clientCpf) {
            throw new ApiError("O cpf do cliente é obrigatório!", 422);
        }

        if(!eventId) {
            throw new ApiError("O id do evento é obrigatório!", 422);
        }

        if(!checkoutId) {
            throw new ApiError("O id do checkout é obrigatório!", 422);
        }

        if (pistaAmount <= 0 && stageAmount <= 0 && vipAmount <= 0 && pistaAmountHalf <= 0 && stageAmountHalf <= 0 && freeAmount <= 0) {
            return
        }
        
        const card: any = await this.cardRepository.findAllByCpf(clientCpf);

        if (!card) {
            throw new ApiError("Adicione um cartão de crédito antes de prosseguir com a compra!", 422);
        }

        const cardExpiration = new Date(card.expirationDate);
        const dateNow = new Date();
        const dateNowFormated = (dateNow.getUTCDate()) + "/" + (dateNow.getMonth() + 1) + "/" + dateNow.getFullYear();

        if (cardExpiration < dateNow) {
            throw new ApiError("Cartão de crédito expirado! Não foi possível prosseguir com a compra!", 422);
        }

        const checkoutExists: any = await this.checkoutRepository.findOneCheckout(checkoutId);

        if (!checkoutExists) {
            throw new ApiError("Checkout inválido!", 422);
        }

        const event: any = await this.eventRepository.findOneEvent(eventId);
        

        if (!event) {
            throw new ApiError("Evento não encontrado", 422);
        }

        if (event.status == false) {
            throw new ApiError("Evento suspenso! não é possível vender ingressos!", 422);
        }
        
        const stockEvent: any = await this.stockRepository.findStock(event.id);
        
        const amountHalfTicketsPista = ((event.porcentagemMeia/100) * event.quantPista);
        const amountHalfTicketsStage = ((event.porcentagemMeia/100) * event.quantStage);
        const amountHalfTicketsVip = ((event.porcentagemMeia/100) * event.quantVip);
        const amountFreeTickets = ((event.porcentagemGratis/100) * event.quantStage);

        if ((stockEvent.quantPista < pistaAmount || stockEvent.quantPista < pistaAmountHalf || stockEvent.quantPista <= amountHalfTicketsPista) && stockEvent.quantPista > 0) {
            throw new ApiError("Ingressos no setor pista esgotados!", 422);
        }

        if ((stockEvent.quantStage < stageAmount || stockEvent.quantStage < stageAmountHalf || stockEvent.quantStage <= amountHalfTicketsStage) && stockEvent.quantStage > 0) {
            throw new ApiError("Ingressos no setor stage esgotados!", 422);
        }

        if ((stockEvent.quantVip <= vipAmount || stockEvent.quantVip <= vipAmountHalf || stockEvent.quantVip <= amountHalfTicketsVip) && stockEvent.quantVip > 0) {
            throw new ApiError("Ingressos no setor vip esgotados!", 422);
        }

        if ((stockEvent.quantPista <= amountFreeTickets) && stockEvent.quantPista > 0) {
            throw new ApiError("Ingressos grátis esgotados!", 422);
        }

        const amount = (pistaAmount*event.valorPista) + (stageAmount*event.valorStage) + (vipAmount*event.valorVip) + ((pistaAmountHalf*event.valorPista)/2) + ((stageAmountHalf*event.valorStage)/2) + ((vipAmountHalf*event.valorVip)/2);

        await this.saleRepository.create(amount, clientCpf, eventId);

        const wallet: any = await this.walletRepository.findWallet(clientCpf);

        if (!wallet || wallet.amount < walletValue) {
            throw new ApiError("Carteira com saldo insuficiente!", 422);
        }
        
        const newAmout = (wallet.amount - walletValue);
        await this.walletRepository.updateWallet(clientCpf, newAmout);
        
        await this.checkoutRepository.deleteById(checkoutId)
        
        const quantPista = (stockEvent.quantPista - (pistaAmount + pistaAmountHalf));
        const quantStage = (stockEvent.quantStage - (stageAmount + stageAmountHalf));
        const quantVip = (stockEvent.quantVip - (vipAmount + vipAmountHalf));

        await this.stockRepository.makeSale(event.id, quantPista, quantStage, quantVip);
        
        const idSale: any = await this.saleRepository.findIdByCpf(clientCpf);

        const IdsTicketsPista: any = [];
        const IdsTicketsStage: any = [];
        const IdsTicketsVip: any = [];
        const IdsTicketsPistaHalf: any = [];
        const IdsTicketsStageHalf: any = [];
        const IdsTicketsVipHalf: any = [];
        const IdsTicketsFree: any = [];
        
        for (let i = 0; i < pistaAmount; i++) {
            const newTicket: any = await this.ticketRepository.create(event.nome, clientCpf, "Pista", "Inteira", event.valorPista, event.dataEvento, idSale.id, event.id);
            const fileName = newTicket.id.replace(/-/g, ""); 
            IdsTicketsPista.push(fileName);
            await generateQrCode(fileName, fileName);
        }

        for (let i = 0; i < stageAmount; i++) {
            const newTicket: any = await this.ticketRepository.create(event.nome, clientCpf, "Stage", "Inteira", event.valorStage, event.dataEvento, idSale.id, event.id);
            const fileName = newTicket.id.replace(/-/g, ""); 
            IdsTicketsStage.push(fileName);
            await generateQrCode(fileName, fileName);
        }

        for (let i = 0; i < vipAmount; i++) {
            const newTicket: any = await this.ticketRepository.create(event.nome, clientCpf, "Vip", "Inteira", event.valorVip, event.dataEvento, idSale.id, event.id);
            const fileName = newTicket.id.replace(/-/g, ""); 
            IdsTicketsVip.push(fileName);
            await generateQrCode(fileName, fileName);
        }

        for (let i = 0; i < pistaAmountHalf; i++) {
            const newTicket: any = await this.ticketRepository.create(event.nome, clientCpf, "Pista", "Meia-entrada", (event.valorPista/2), event.dataEvento, idSale.id, event.id);
            const fileName = newTicket.id.replace(/-/g, ""); 
            IdsTicketsPistaHalf.push(fileName);
            await generateQrCode(fileName, fileName);
        }

        for (let i = 0; i < stageAmountHalf; i++) {
            const newTicket: any = await this.ticketRepository.create(event.nome, clientCpf, "Stage", "Meia-entrada", (event.valorStage/2), event.dataEvento, idSale.id, event.id);
            const fileName = newTicket.id.replace(/-/g, ""); 
            IdsTicketsStageHalf.push(fileName);
            await generateQrCode(fileName, fileName);
        }

        for (let i = 0; i < vipAmountHalf; i++) {
            const newTicket: any = await this.ticketRepository.create(event.nome, clientCpf, "Vip", "Meia-entrada", (event.valorVip/2), event.dataEvento, idSale.id, event.id);
            const fileName = newTicket.id.replace(/-/g, ""); 
            IdsTicketsVipHalf.push(fileName);
            await generateQrCode(fileName, fileName);
        }

        for (let i = 0; i < freeAmount; i++) {
            const newTicket: any = await this.ticketRepository.create(event.nome, clientCpf, "Pista", "Grátis", 0.00, event.dataEvento, idSale.id, event.id);
            const fileName = newTicket.id.replace(/-/g, ""); 
            IdsTicketsFree.push(fileName);
            await generateQrCode(fileName, fileName);
        }

        const enderecoEvent: any = await this.enderecoEventRepository.findOneEnderecoEvent(event.enderecoEventId);
        const eventDate = new Date(event.dataEvento);
        const dateEvent = (eventDate.getUTCDate()) + "/" + (eventDate.getMonth() + 1) + "/" + eventDate.getFullYear();

        const ticketsPistaInfo = {
            nameEvent: event.nome,
            amount: pistaAmount,
            dateEvent,
            dateNow: dateNowFormated,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Pista',
            profile: 'Inteira',
            value: event.valorPista,
            dateSale: dateEvent,
            clientCpf,
            clientName,
            IdsTickets: IdsTicketsPista
        }

        const ticketsStageInfo = {
            nameEvent: event.nome,
            amount: stageAmount,
            dateEvent,
            dateNow: dateNowFormated,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Stage',
            profile: 'Inteira',
            value: event.valorStage,
            dateSale: dateEvent,
            clientCpf,
            clientName,
            IdsTickets: IdsTicketsStage
        }

        const ticketsVipInfo = {
            nameEvent: event.nome,
            amount: vipAmount,
            dateEvent,
            dateNow: dateNowFormated,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Vip',
            profile: 'Inteira',
            value: event.valorVip,
            dateSale: dateEvent,
            clientCpf,
            clientName,
            IdsTickets: IdsTicketsVip
        }

        const ticketsPistaHalfInfo = {
            nameEvent: event.nome,
            amount: pistaAmountHalf,
            dateEvent,
            dateNow: dateNowFormated,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Pista',
            profile: 'Meia-Entrada',
            value: event.valorPista/2,
            dateSale: dateEvent,
            clientCpf,
            clientName,
            IdsTickets: IdsTicketsPistaHalf
        }

        const ticketsStageHalfInfo = {
            nameEvent: event.nome,
            amount: stageAmountHalf,
            dateEvent,
            dateNow: dateNowFormated,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Stage',
            profile: 'Meia-Entrada',
            value: event.valorStage/2,
            dateSale: dateEvent,
            clientCpf,
            clientName,
            IdsTickets: IdsTicketsStageHalf
        }

        const ticketsVipHalfInfo = {
            nameEvent: event.nome,
            amount: vipAmountHalf,
            dateEvent,
            dateNow: dateNowFormated,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'vip',
            profile: 'Meia-Entrada',
            value: event.valorVip/2,
            dateSale: dateEvent,
            clientCpf,
            clientName,
            IdsTickets: IdsTicketsVipHalf
        }

        const ticketsFreeInfo = {
            nameEvent: event.nome,
            amount: freeAmount,
            dateEvent,
            dateNow: dateNowFormated,
            enderecoEvent: `${enderecoEvent.rua}, nº ${enderecoEvent.numero} - ${enderecoEvent.bairro}`,
            cidadeEvent: `${enderecoEvent.cidade} - ${enderecoEvent.estado}`,
            sector: 'Pista',
            profile: 'Grátis',
            value: 0.00,
            dateSale: dateEvent,
            clientCpf,
            clientName,
            IdsTickets: IdsTicketsFree
        }

        await this.emailProvider.sendEmailTicketAttached(email, ticketsPistaInfo);
        await this.emailProvider.sendEmailTicketAttached(email, ticketsStageInfo);
        await this.emailProvider.sendEmailTicketAttached(email, ticketsVipInfo);
        await this.emailProvider.sendEmailTicketAttached(email, ticketsPistaHalfInfo);
        await this.emailProvider.sendEmailTicketAttached(email, ticketsStageHalfInfo);
        await this.emailProvider.sendEmailTicketAttached(email, ticketsVipHalfInfo);
        await this.emailProvider.sendEmailTicketAttached(email, ticketsFreeInfo);

        var arrayRemove: any = [];
        arrayRemove = ticketsPistaInfo.IdsTickets.concat(ticketsStageInfo.IdsTickets, ticketsVipInfo.IdsTickets, ticketsPistaHalfInfo.IdsTickets, ticketsStageHalfInfo.IdsTickets, ticketsVipHalfInfo.IdsTickets, ticketsFreeInfo);
        
        for (let img of arrayRemove) {
            await deleteFile(`backend/temp/${img}.jpg`);
        }
    }
}

export { MakePurchaseUseCase };