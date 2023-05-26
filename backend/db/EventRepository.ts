import { createEnderecoEventController } from "../controllers/create event endereco/index";
import { CreateEnderecoEventController } from "../controllers/create event endereco/CreateEnderecoEventController";
import { Event } from "../models/Event";


class EventRepository {

    private createEnderecoEventController: CreateEnderecoEventController;

    public constructor () {
        this.createEnderecoEventController = createEnderecoEventController;
    }

    public async create (promoterCpf: number, nome: string, descricao: string, dataEvento: Date, status: boolean, quantPista: number, quantStage: number, quantVip: number, valorPista: number, valorStage: number, valorVip: number, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number) {

        await this.createEnderecoEventController.handle(cep, estado, cidade, bairro, rua, numero).then(async (enderecoEvent: any)=>{
            const enderecoEventId = enderecoEvent.id;
            await Event.create({nome, descricao, dataEvento, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip, promoterCpf, enderecoEventId});
        });
    }

    public async findAllEvents () {
        const allEvents = await Event.findAll();
        return allEvents;
    }

    public async findAllHighlights () {
        const allHighlights = await Event.findAll({raw: true, where: {
            destaque: true
        }});
        return allHighlights;
    }

    public async findOneEvent (id: string) {
        const event = await Event.findOne({raw: true, where: {
            id: id
        }});
        return event;
    }

    public async findByIdAndAvatar (id: string, promoterCpf: number) {
        const idAndAvatar = await Event.findOne({raw: true, attributes: ['id', 'imageEvent'], where: {
            id: id,
            promoterCpf: promoterCpf
        }});
        return idAndAvatar;
    }

    public async updateImage (id: string, promoterCpf: number, imageEvent: any){
        await Event.update({
            imageEvent: imageEvent
        },
        {
            where: {
                id: id,
                promoterCpf: promoterCpf
            }
        });
    }
    public async setFeatured (id: string){
        await Event.update({
            destaque: true
        },
        {
            where: {
                id: id
            }
        });
    }





    public async updateData (promoterCpf: number, id: string, nome: string, descricao: string, dataEvento: Date, quantPista: number, quantStage: number, quantVip: number, valorPista: number, valorStage: number, valorVip: number, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number){

        await Event.update({
            nome : nome,
            descricao : descricao,
            dataEvento: dataEvento,
            quantPista : quantPista,
            quantStage : quantStage,
            quantVip : quantVip,
            valorPista : valorPista,
            valorStage : valorStage,
            valorVip : valorVip,
            cep : cep,
            estado : estado,
            cidade : cidade,
            bairro : bairro,
            rua : rua,
            numero : numero
        },
        {
            where: {
                id: id,
                promoterCpf: promoterCpf
            }
        });
    }



}



export { EventRepository };