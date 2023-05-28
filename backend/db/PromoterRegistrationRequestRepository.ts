import { PromoterRegistrationRequest } from "../models/PromoterRegistrationRequest";


class PromoterRegistrationRequestRepository {

    public async create (name: string, email: string, promoterCpf: number) {
        await PromoterRegistrationRequest.create({name, email, promoterCpf});
    }

    public async findByCpf (promoterCpf: number) {
        const registrationRequest = await PromoterRegistrationRequest.findOne({raw: true,
            where: {
                promoterCpf: promoterCpf
        }});

        return registrationRequest;
    }

    public async registrationRequestExists (promoterCpf: number) {
        const registrationRequestExists = await PromoterRegistrationRequest.findOne({raw: true, attributes: ['id'],
            where: {
                promoterCpf: promoterCpf
        }});

        return registrationRequestExists;
    }


    public async remove (promoterCpf: number) {
        await PromoterRegistrationRequest.destroy({
            where: {promoterCpf: promoterCpf}
        });
    }
}

export { PromoterRegistrationRequestRepository };