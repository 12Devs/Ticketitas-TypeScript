import { CheckoutRepository } from "../../db/CheckoutRepository";
import { EnderecoUserRepository } from "../../db/EnderecoUserRepository";
import { ApiError } from "../../errors/ApiError";

class ListOneCheckoutUseCase {

    private checkoutRepository: CheckoutRepository;

    constructor (checkoutRepository: CheckoutRepository) {
        this.checkoutRepository = checkoutRepository;
    }

    public async execute (id: string){
        const checkout: any = await this.checkoutRepository.findOneCheckout(id);
    
        if(!checkout) {
            throw new ApiError("Checkout não encontrado", 400);
        }

        
        return { checkout };
    }

}

export { ListOneCheckoutUseCase };