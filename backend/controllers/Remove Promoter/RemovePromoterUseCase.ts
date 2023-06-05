import { PromoterRepository } from "../../db/PromoterRepository";


//class
class RemovePromoterUseCase{
    private promoterRepository: PromoterRepository;


    constructor (eventRepository: PromoterRepository) {
        this.promoterRepository = eventRepository;
    }

    
    public async execute (promoterCpf: number){
        const oneEvent = await this.promoterRepository.RemovePromoterByCpf(promoterCpf);
        return oneEvent;
    }



}
export { RemovePromoterUseCase };