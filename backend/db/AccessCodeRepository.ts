import { AccessCode } from "../models/accesscode";

class AccessCodeRepository {

    public constructor (){}
    
    public async create (cpf: number){
        await AccessCode.create({cpf});
    }
    

    public async findByAccessCode (codigoDeAcesso: number) {
        const accessCodeExists = await AccessCode.findOne({raw: true, attributes: ['codigoDeAcesso'], where: {
            codigoDeAcesso: codigoDeAcesso
        }});
        return accessCodeExists;
    }
}

export { AccessCodeRepository };