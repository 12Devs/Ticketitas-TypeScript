import { ListOneAdministratorUseCase } from "./ListOneAdministratorUseCase";
import { Request, Response } from "express";

class ListOneAdministratorController {

    private listOneAdministratorUseCase: ListOneAdministratorUseCase;

    public constructor (listOneAdministratorUseCase: ListOneAdministratorUseCase) {
        this.listOneAdministratorUseCase = listOneAdministratorUseCase;
    }

    public async handle (request: Request, response: Response){
        const { cpf }: any = request.user;
        const AdministratorInfos = await this.listOneAdministratorUseCase.execute(cpf);
        return response.status(200).json({AdministratorInfos});
    }

}

export { ListOneAdministratorController };