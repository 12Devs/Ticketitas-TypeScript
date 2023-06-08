import { createEnderecoEventController } from "../controllers/create event endereco/index";
import { CreateEnderecoEventController } from "../controllers/create event endereco/CreateEnderecoEventController";
import { Event } from "../models/Event";


/**
 * Class for handling the IO of database info
 * @date 6/6/2023 - 10:54:53 PM
 *
 * @class EventRepository
 * @typedef {EventRepository}
 */
class EventRepository {
    
    /**
     * Creates an instance of {@link EventRepository}.
     * @date 6/6/2023 - 10:55:05 PM
     *
     * @private
     * @type {CreateEnderecoEventController}
     */
    private createEnderecoEventController: CreateEnderecoEventController;
    
    /**
     * Creates an instance of EventRepository.
     * @date 6/6/2023 - 10:55:08 PM
     *
     * @constructor
     * @public
     */
    public constructor () {
        this.createEnderecoEventController = createEnderecoEventController;
    }
    
    /**
     * Create a event
     * @date 6/6/2023 - 10:55:12 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @param {string} nome
     * @param {string} descricao
     * @param {Date} dataEvento
     * @param {boolean} status
     * @param {number} quantPista
     * @param {number} quantStage
     * @param {number} quantVip
     * @param {number} valorPista
     * @param {number} valorStage
     * @param {number} valorVip
     * @param {number} porcentagemMeia
     * @param {number} porcentagemGratis
     * @param {number} cep
     * @param {string} estado
     * @param {string} cidade
     * @param {string} bairro
     * @param {string} rua
     * @param {number} numero
     * @returns
     */
    public async create (promoterCpf: number, nome: string, descricao: string, dataEvento: Date, status: boolean, quantPista: number, quantStage: number, quantVip: number, valorPista: number, valorStage: number, valorVip: number,  porcentagemMeia: number, porcentagemGratis: number, cep: number, estado: string, cidade: string, bairro: string, rua: string, numero: number) {

        const enderecoEvent: any = await this.createEnderecoEventController.handle(cep, estado, cidade, bairro, rua, numero);
        
        const enderecoEventId = enderecoEvent.id;

        const event = await Event.create({nome, descricao, dataEvento, status, quantPista, quantStage, quantVip, valorPista, valorStage, valorVip,  porcentagemMeia, porcentagemGratis, promoterCpf, enderecoEventId});
        
        return event;
    }
    
    /**
     * Find all events
     * @date 6/6/2023 - 10:55:18 PM
     *
     * @public
     * @async
     * @returns {unknown}
     */
    public async findAllEvents () {
        const allEvents = await Event.findAll();
        return allEvents;
    }
    
    /**
     * Find all highlights
     * @date 6/6/2023 - 10:55:22 PM
     *
     * @public
     * @async
     * @returns {unknown}
     */
    public async findAllHighlights () {
        const allHighlights = await Event.findAll({raw: true, where: {
            status: true,
            destaque: true
        }});
        return allHighlights;
    }
    
    /**
     * Find id and status of event by cpf promoter
     * @date 6/6/2023 - 10:55:26 PM
     *
     * @public
     * @async
     * @param {number} cpf
     * @returns {unknown}
     */
    public async findIdStatuByCpfPromoter (cpf: number) {
        const allEventsByPromoter = await Event.findAll({raw: true,  attributes: ['id', 'status', 'promoterCpf'],
        where: {
            Promotercpf: cpf
        }});

        return allEventsByPromoter;
    }
    
    /**
     * Find one event
     * @date 6/6/2023 - 10:55:31 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {Promise<Event | null>}
     */
    public async findOneEvent(id: string): Promise<Event | null> {
        const event = await Event.findOne({ raw: true, where: { id } }) as (Event | null);
        return event;
      }
      
    /**
     * Find event by id and avatar
     * @date 6/6/2023 - 10:55:35 PM
     *
     * @public
     * @async
     * @param {string} id
     * @param {number} promoterCpf
     * @returns {unknown}
     */
    public async findByIdAndAvatar (id: string, promoterCpf: number) {
        const idAndAvatar = await Event.findOne({raw: true, attributes: ['id', 'imageEvent'], where: {
            id: id,
            promoterCpf: promoterCpf
        }});
        return idAndAvatar;
    }
    
    /**
     * Find event by id and cpf promoter
     * @date 6/6/2023 - 10:55:40 PM
     *
     * @public
     * @async
     * @param {string} id
     * @param {number} promoterCpf
     * @returns {unknown}
     */
    public async findByIdAndCpfPromoter (id: string, promoterCpf: number) {
        const belongsToPromoter = await Event.findOne({raw: true, attributes: ['promoterCpf', 'status'], where: {
            id: id,
            promoterCpf: promoterCpf
        }});
        return belongsToPromoter;
    }
    
    /**
     * Update image event
     * @date 6/6/2023 - 10:55:44 PM
     *
     * @public
     * @async
     * @param {string} id
     * @param {number} promoterCpf
     * @param {*} imageEvent
     * @returns {*}
     */
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
    
    /**
     * Update status event
     * @date 6/6/2023 - 10:55:48 PM
     *
     * @public
     * @async
     * @param {string} id
     * @param {number} promoterCpf
     * @param {boolean} newStatus
     * @returns {*}
     */
    public async updateStatus (id: string, promoterCpf: number, newStatus: boolean){
        await Event.update({
            status: newStatus
        },
        {
            where: {
                id: id,
                promoterCpf: promoterCpf
            }
        });
    }
    
    /**
     * Suspend event
     * @date 6/6/2023 - 10:55:54 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @returns {*}
     */
    public async supendEvent (promoterCpf: number){
        await Event.update({
            status: false
        },
        {
            where: {
                promoterCpf: promoterCpf
            }
        });
    }
    
    /**
     * set event featured
     * @date 6/6/2023 - 10:58:20 PM
     *
     * @public
     * @async
     * @param {string} id
     * @returns {*}
     */
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
    
    /**
     * Update data event
     * @date 6/6/2023 - 10:58:33 PM
     *
     * @public
     * @async
     * @param {number} promoterCpf
     * @param {string} id
     * @param {string} nome
     * @param {string} descricao
     * @param {Date} dataEvento
     * @param {number} quantPista
     * @param {number} quantStage
     * @param {number} quantVip
     * @param {number} valorPista
     * @param {number} valorStage
     * @param {number} valorVip
     * @param {number} cep
     * @param {string} estado
     * @param {string} cidade
     * @param {string} bairro
     * @param {string} rua
     * @param {number} numero
     * @returns {*}
     */
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
    
    /**
     * Find all events raw
     * @date 6/6/2023 - 10:58:40 PM
     *
     * @public
     * @async
     * @returns {unknown}
     */
    public async findAllEventsRaw () {
        const allEvents = await Event.findAll({raw: true});
        return allEvents;
    }



}



export { EventRepository };