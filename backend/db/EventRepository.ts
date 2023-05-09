import { createEnderecoEventController } from "../controllers/create event endereco/index";
import { CreateEnderecoEventController } from "../controllers/create event endereco/CreateEnderecoEventController";
import { Event } from "../models/Event";


class EventRepository {

    private createEnderecoEventController: CreateEnderecoEventController;

    public constructor () {
        this.createEnderecoEventController = createEnderecoEventController;
    }


    public async create (nome: string, descricao: string, status: boolean, quantPista: number, quantStage: number, quantVip: number, valorPista: number, valorStage: number, valorVip: number, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number) {

        await this.createEnderecoEventController.handle(cep, estado, cidade, bairro, rua, numero).then(async (enderecoEvent: any)=>{
            const enderecoEventId = enderecoEvent.id;
            await Event.create({nome, descricao, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, enderecoEventId});
        });
    }
}

export { EventRepository };