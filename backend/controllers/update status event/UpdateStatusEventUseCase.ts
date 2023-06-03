import { EventRepository } from "../../db/EventRepository";
import { TicketRepository } from "../../db/TicketRepository";
import { WalletRepository } from "../../db/WalletRepository";
import { ApiError } from "../../errors/ApiError";

class UpdateStatusEventUseCase {

    private eventRepository: EventRepository;
    private ticketRepository: TicketRepository;
    private walletRepository: WalletRepository;

    public constructor (eventRepository: EventRepository, ticketRepository: TicketRepository, walletRepository: WalletRepository) {
        this.eventRepository = eventRepository;
        this.ticketRepository = ticketRepository;
        this.walletRepository = walletRepository;
    }

    public async execute (id: string, promoterCpf: number) {

        if (!id) {
            throw new ApiError("Id do evento é obrigatório", 422);
        }

        if (!promoterCpf) {
            throw new ApiError("Cpf do promoter é obrigatório", 422);
        }

        const belongsToPromoter: any = await this.eventRepository.findByIdAndCpfPromoter(id, promoterCpf);

        if (!belongsToPromoter) {
            throw new ApiError("Evento não encontrado ou não pertence ao promoter!", 422);
        }

        let newStatus = true;

        if (belongsToPromoter.status == true) {
            newStatus = false
        }

        await this.eventRepository.updateStatus(id, promoterCpf, newStatus);

        const allTicketsEvent: any = await this.ticketRepository.findAllTicketsByEvent(id);

        if (allTicketsEvent && belongsToPromoter.status == true) {

            for (let ticket of allTicketsEvent) {
                
                const walletExists: any = await this.walletRepository.findWallet(ticket.clientCpf);

                if (!walletExists && ticket.status == true){
                    await this.walletRepository.create(ticket.clientCpf, ticket.value);
                } else if(ticket.status == true) {
                    const newAmout = (walletExists.amout + ticket.value)
                    await this.walletRepository.updateWallet(ticket.clientCpf, newAmout)
                }

                await this.ticketRepository.updateStatus(ticket.id);
            }
        }
        
    }
}

export { UpdateStatusEventUseCase };