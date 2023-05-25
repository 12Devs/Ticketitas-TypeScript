import { PromoterRegistrationRequest } from "../models/PromoterRegistrationRequest";


class PromoterRegistrationRequestRepository {

    public async create (name: string, email: string, promoterCpf: number) {
        await PromoterRegistrationRequest.create({name, email, promoterCpf});
    }
}

export { PromoterRegistrationRequestRepository };